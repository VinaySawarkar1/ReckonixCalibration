import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertQuoteRequestSchema, 
  insertContactMessageSchema,
  insertCompanyEventSchema,
  insertMainCatalogSchema,
  insertCustomerSchema,
  loginSchema,
  insertJobSchema,
  insertJobApplicationSchema
} from "@shared/schema";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from "express";
import { addComplaint, addChatbotSummary, getChatbotSummaries, getAllCategories, createCategory, updateCategory, deleteCategory } from "./storage";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// In-memory session state for chatbot (for demo; use real session in production)
const chatSessions: Record<string, any> = {};

// Helper to determine type from session
function getSessionType(session: any) {
  if (session.complaint) return "complaint";
  // Add more types as needed
  return "inquiry";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Configure multer for file uploads
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      // Generate unique filename with original extension
      const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  const productUpload = multer({
    storage: storageConfig,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
      files: 10 // Maximum 10 files
    },
    fileFilter: (req, file, cb) => {
      // Check file type
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, use proper JWT and password hashing
      res.json({ 
        user: { id: user.id, username: user.username, role: user.role },
        token: `mock-jwt-${user.id}` // Mock token for demo
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Products routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      let products = await storage.getAllProducts(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Increment view count
      await storage.incrementProductViews(id);
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", productUpload.array('images', 10), async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      
      // Handle uploaded files
      const uploadedFiles = req.files as Express.Multer.File[];
      const imageUrls: string[] = [];
      
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Generate URLs for uploaded images
        imageUrls.push(...uploadedFiles.map(file => `/uploads/products/${file.filename}`));
      }
      
      // Parse product data from form fields
      const productData = {
        ...req.body,
        imageUrl: imageUrls[0] || req.body.imageUrl || "", // First image as main image
        imageGallery: imageUrls.length > 0 ? imageUrls : (req.body.imageGallery ? JSON.parse(req.body.imageGallery) : [])
      };
      // Convert homeFeatured to boolean if present
      if (typeof productData.homeFeatured === 'string') {
        productData.homeFeatured = productData.homeFeatured === 'true';
      }
      // Parse JSON string fields to arrays/objects
      const parseIfJson = (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return val;
          }
        }
        return val;
      };
      ["specifications", "featuresBenefits", "applications", "certifications", "technicalDetails"].forEach((field) => {
        if (productData[field]) {
          productData[field] = parseIfJson(productData[field]);
        }
      });
      
      const validatedData = insertProductSchema.parse(productData);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Product creation error:", error);
      res.status(400).json({ 
        message: "Invalid product data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.put("/api/products/:id", productUpload.array('images', 10), async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      // Handle uploaded files
      const uploadedFiles = req.files as Express.Multer.File[];
      const imageUrls: string[] = [];
      
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Generate URLs for uploaded images
        imageUrls.push(...uploadedFiles.map(file => `/uploads/products/${file.filename}`));
      }
      
      // Parse product data from form fields
      const productData = {
        ...req.body,
        imageUrl: imageUrls[0] || req.body.imageUrl || "", // First image as main image
        imageGallery: imageUrls.length > 0 ? imageUrls : (req.body.imageGallery ? JSON.parse(req.body.imageGallery) : [])
      };
      // Convert homeFeatured to boolean if present
      if (typeof productData.homeFeatured === 'string') {
        productData.homeFeatured = productData.homeFeatured === 'true';
      }
      // Parse JSON string fields to arrays/objects
      const parseIfJson = (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return val;
          }
        }
        return val;
      };
      ["specifications", "featuresBenefits", "applications", "certifications", "technicalDetails"].forEach((field) => {
        if (productData[field]) {
          productData[field] = parseIfJson(productData[field]);
        }
      });

      const validatedData = insertProductSchema.partial().parse(productData);
      const product = await storage.updateProduct(id, validatedData);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error('Product update error:', error);
      console.error('Product data received:', req.body);
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const deleted = await storage.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Category routes (moved up)
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  app.post('/api/categories', async (req, res) => {
    try {
      const { name, subcategories } = req.body;
      
      if (!name || !subcategories || !Array.isArray(subcategories)) {
        return res.status(400).json({ error: 'Invalid category data' });
      }

      const newCategory = await createCategory({ name, subcategories });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  app.put('/api/categories/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, subcategories } = req.body;
      
      if (!name || !subcategories || !Array.isArray(subcategories)) {
        return res.status(400).json({ error: 'Invalid category data' });
      }

      const updatedCategory = await updateCategory(id, { name, subcategories });
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  });

  app.delete('/api/categories/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await deleteCategory(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  });

  // Quote routes
  app.post("/api/quotes", async (req: Request, res: Response) => {
    try {
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
      
      // In production, send email notification here using Nodemailer
      console.log("New quote request:", quote);
      
      res.status(201).json({ message: "Quote request submitted successfully", id: quote.id });
    } catch (error) {
      console.error("Quote creation error:", error);
      res.status(400).json({ 
        message: "Invalid quote request data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/quotes", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.put("/api/quotes/:id/status", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id) || !['New', 'Contacted', 'Closed'].includes(status)) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const quote = await storage.updateQuoteStatus(id, status);
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }

      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: "Failed to update quote status" });
    }
  });

  // Messages routes
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      
      // In production, send email notification here using Nodemailer
      console.log("New contact message:", message);
      
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  app.get("/api/messages", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.put("/api/messages/:id/replied", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      const { replied } = req.body;
      
      if (isNaN(id) || typeof replied !== 'boolean') {
        return res.status(400).json({ message: "Invalid data" });
      }

      const message = await storage.markMessageReplied(id, replied);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to update message status" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/website-views", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const views = await storage.getWebsiteViews();
      res.json({ totalViews: views });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch website views" });
    }
  });

  app.post("/api/analytics/website-views", async (req: Request, res: Response) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      await storage.incrementWebsiteViews(ip);
      res.json({ message: "View recorded" });
    } catch (error) {
      res.status(500).json({ message: "Failed to record view" });
    }
  });

  app.get("/api/analytics/product-views", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const productViews = await storage.getProductViews();
      res.json(productViews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product views" });
    }
  });

  // Company Events routes
  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const eventData = insertCompanyEventSchema.parse({
        ...req.body,
        eventDate: new Date(req.body.eventDate)
      });
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Event creation error:", error);
      res.status(400).json({ 
        message: "Invalid event data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.put("/api/events/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      const eventData = insertCompanyEventSchema.partial().parse({
        ...req.body,
        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : undefined
      });
      const event = await storage.updateEvent(id, eventData);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  app.delete("/api/events/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      const deleted = await storage.deleteEvent(id);
      if (!deleted) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Catalog routes
  app.get("/api/catalog/main-catalog", async (req: Request, res: Response) => {
    try {
      const catalogInfo = await storage.getMainCatalog();
      if (!catalogInfo || !catalogInfo.pdfUrl) {
        return res.status(404).json({ message: "Main catalog not found" });
      }
      res.json(catalogInfo);
    } catch (error) {
      res.status(500).json({ message: "Failed to serve catalog" });
    }
  });

  app.post("/api/catalog/main-catalog", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const catalogData = insertMainCatalogSchema.parse(req.body);
      const catalog = await storage.updateMainCatalog(catalogData);
      res.json(catalog);
    } catch (error) {
      console.error("Catalog update error:", error);
      res.status(400).json({ 
        message: "Failed to update catalog",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Customer routes
  app.get("/api/customers", async (req: Request, res: Response) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customers" });
    }
  });

  app.get("/api/customers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      const customer = await storage.getCustomer(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customer" });
    }
  });

  app.post("/api/customers", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const customerData = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      console.error("Customer creation error:", error);
      res.status(400).json({ 
        message: "Invalid customer data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.put("/api/customers/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      const customerData = insertCustomerSchema.partial().parse(req.body);
      const customer = await storage.updateCustomer(id, customerData);
      
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      res.status(400).json({ message: "Invalid customer data" });
    }
  });

  app.delete("/api/customers/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
      }

      const deleted = await storage.deleteCustomer(id);
      if (!deleted) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete customer" });
    }
  });

  // === Job Management & Applications ===
  // Set up multer for resume uploads
  const uploadDir = path.join(__dirname, '../uploads/resumes');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const upload = multer({ dest: uploadDir });

  // List all jobs
  app.get('/api/jobs', async (req, res) => {
    const jobs = await storage.getAllJobs();
    res.json(jobs);
  });

  // Create a new job (admin)
  app.post('/api/jobs', async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ message: 'Invalid job data' });
    }
  });

  // Delete a job (admin)
  app.delete('/api/jobs/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid job ID' });
    const deleted = await storage.deleteJob(id);
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  });

  // Submit a job application (with resume upload)
  app.post('/api/apply', upload.single('resume'), async (req, res) => {
    try {
      const { name, email, location, experience, jobId } = req.body;
      const job = await storage.getJob(Number(jobId));
      if (!job) return res.status(400).json({ message: 'Invalid job' });
      if (!req.file) return res.status(400).json({ message: 'Resume required' });
      const resumeUrl = `/uploads/resumes/${req.file.filename}`;
      const appData = insertJobApplicationSchema.parse({
        name, email, location, experience, resumeUrl, jobId: Number(jobId), jobTitle: job.title
      });
      const application = await storage.createJobApplication(appData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ message: 'Invalid application data' });
    }
  });

  // List all job applications (admin)
  app.get('/api/applications', async (req, res) => {
    const applications = await storage.getAllJobApplications();
    res.json(applications);
  });

  // Serve uploaded resumes statically
  app.use('/uploads/resumes', (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });

  // Serve uploaded product images statically
  app.use('/uploads/products', (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });

  router.post("/api/chatbot", async (req, res) => {
    const { message, sessionId } = req.body;
    const text = message?.toLowerCase() || "";
    let reply = "Sorry, I didn't understand that. Can you rephrase or provide more details?";

    // Session state
    let session = chatSessions[sessionId] || {};

    // Complaint flow
    if (session.awaiting === "complaint_detail") {
      session.complaint = { ...session.complaint, message };
      reply = "Thank you. Please provide your name.";
      session.awaiting = "complaint_name";
    } else if (session.awaiting === "complaint_name") {
      session.complaint = { ...session.complaint, name: message };
      reply = "And your email address?";
      session.awaiting = "complaint_email";
    } else if (session.awaiting === "complaint_email") {
      session.complaint = { ...session.complaint, email: message };
      // Store complaint
      addComplaint({
        id: uuidv4(),
        ...session.complaint,
        status: "open",
        createdAt: new Date().toISOString(),
      });
      // Store summary
      addChatbotSummary({
        sessionId,
        type: "complaint",
        name: session.complaint.name,
        email: session.complaint.email,
        message: session.complaint.message,
        createdAt: new Date().toISOString(),
      });
      reply = "Your complaint/requirement has been submitted. Our team will contact you soon. Is there anything else I can help with?";
      session = {};
    } else if (text.includes("complaint") || text.includes("issue") || text.includes("problem") || text.includes("requirement")) {
      reply = "I'm sorry to hear that. Please describe your complaint or requirement in detail.";
      session = { awaiting: "complaint_detail", complaint: {} };
    } else if (text.includes("product") || text.includes("catalog")) {
      // Store summary for product inquiry
      addChatbotSummary({
        sessionId,
        type: "product_inquiry",
        message,
        createdAt: new Date().toISOString(),
      });
      reply = "We offer a wide range of calibration, testing, and measuring systems. Would you like to see our product catalog or need help choosing a product?";
    } else if (text.includes("contact") || text.includes("support") || text.includes("help")) {
      addChatbotSummary({
        sessionId,
        type: "support_inquiry",
        message,
        createdAt: new Date().toISOString(),
      });
      reply = "You can reach our support team at support@reckonix.com or call +91-12345-67890. How else can I assist you?";
    } else if (text.includes("company") || text.includes("about")) {
      addChatbotSummary({
        sessionId,
        type: "company_info",
        message,
        createdAt: new Date().toISOString(),
      });
      reply = "Reckonix is a leader in precision calibration, testing, and measuring systems. Let me know if you want more details about our company or services.";
    }

    chatSessions[sessionId] = session;
    console.log("Chatbot received:", { message, sessionId, reply });
    res.json({ reply });
  });

  // Admin: Get all chatbot summaries
  router.get("/api/chatbot-summaries", (req, res) => {
    res.json(getChatbotSummaries());
  });

  // Admin: Download summaries as Excel
  router.get("/api/chatbot-summaries/excel", (req, res) => {
    const summaries = getChatbotSummaries();
    const ws = XLSX.utils.json_to_sheet(summaries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summaries");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader("Content-Disposition", "attachment; filename=chatbot_summaries.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buf);
  });

  // Product search endpoint for navbar search bar
  router.get("/api/products", async (req, res) => {
    const { search } = req.query;
    let products = await storage.getAllProducts();
    if (search) {
      const s = String(search).toLowerCase();
      products = products.filter((p: any) => p.name.toLowerCase().includes(s));
    }
    res.json(products);
  });

  const httpServer = createServer(app);
  return httpServer;
}

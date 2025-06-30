import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertQuoteRequestSchema, 
  insertContactMessageSchema,
  loginSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
      const products = await storage.getAllProducts(category);
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

  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      // In production, verify JWT token here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
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

  // Quote routes
  app.post("/api/quotes", async (req: Request, res: Response) => {
    try {
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
      
      // In production, send email notification here using Nodemailer
      console.log("New quote request:", quote);
      
      res.status(201).json({ message: "Quote request submitted successfully", id: quote.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid quote request data" });
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

  // Catalog route
  app.get("/api/catalog/main-catalog", async (req: Request, res: Response) => {
    try {
      // In production, serve actual PDF file
      res.json({ message: "Main catalog download - PDF file would be served here" });
    } catch (error) {
      res.status(500).json({ message: "Failed to serve catalog" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

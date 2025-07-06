import { 
  User, 
  InsertUser, 
  Product, 
  InsertProduct, 
  QuoteRequest, 
  InsertQuoteRequest, 
  ContactMessage, 
  InsertContactMessage, 
  ViewData,
  CompanyEvent,
  InsertCompanyEvent,
  MainCatalog,
  InsertMainCatalog,
  Customer,
  InsertCustomer,
  Job,
  InsertJob,
  JobApplication,
  InsertJobApplication,
  Complaint,
  ChatbotSummary,
  Category,
  InsertCategory
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(category?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  incrementProductViews(id: number): Promise<void>;

  // Quote methods
  getAllQuotes(): Promise<QuoteRequest[]>;
  getQuote(id: number): Promise<QuoteRequest | undefined>;
  createQuote(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  updateQuoteStatus(id: number, status: 'New' | 'Contacted' | 'Closed'): Promise<QuoteRequest | undefined>;

  // Contact message methods
  getAllMessages(): Promise<ContactMessage[]>;
  getMessage(id: number): Promise<ContactMessage | undefined>;
  createMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageReplied(id: number, replied: boolean): Promise<ContactMessage | undefined>;

  // Analytics methods
  getWebsiteViews(): Promise<number>;
  incrementWebsiteViews(ip?: string): Promise<void>;
  getProductViews(): Promise<{ productId: number; views: number; productName: string }[]>;

  // Company Events methods
  getAllEvents(): Promise<CompanyEvent[]>;
  getEvent(id: number): Promise<CompanyEvent | undefined>;
  createEvent(event: InsertCompanyEvent): Promise<CompanyEvent>;
  updateEvent(id: number, event: Partial<InsertCompanyEvent>): Promise<CompanyEvent | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Main Catalog methods
  getMainCatalog(): Promise<MainCatalog | undefined>;
  updateMainCatalog(catalog: InsertMainCatalog): Promise<MainCatalog>;

  // Customer methods
  getAllCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;

  // Job methods
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  deleteJob(id: number): Promise<boolean>;

  // Job Application methods
  getAllJobApplications(): Promise<JobApplication[]>;
  createJobApplication(app: InsertJobApplication): Promise<JobApplication>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private quotes: Map<number, QuoteRequest>;
  private messages: Map<number, ContactMessage>;
  private viewData: Map<string, ViewData>;
  private events: Map<number, CompanyEvent>;
  private mainCatalog: MainCatalog | undefined;
  private customers: Map<number, Customer>;
  private currentUserId: number;
  private currentProductId: number;
  private currentQuoteId: number;
  private currentMessageId: number;
  private currentViewId: number;
  private currentEventId: number;
  private currentCustomerId: number;
  private jobs: Map<number, Job> = new Map();
  private jobApplications: Map<number, JobApplication> = new Map();
  private currentJobId: number = 1;
  private currentJobAppId: number = 1;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.quotes = new Map();
    this.messages = new Map();
    this.viewData = new Map();
    this.events = new Map();
    this.mainCatalog = undefined;
    this.customers = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentQuoteId = 1;
    this.currentMessageId = 1;
    this.currentViewId = 1;
    this.currentEventId = 1;
    this.currentCustomerId = 1;

    // Initialize with default admin user
    this.createUser({
      username: 'admin',
      password: 'admin123', // In real app, this would be hashed
      role: 'admin'
    });

    // Initialize with sample products and events
    this.initializeSampleData();
    this.initializeSampleEvents();
    this.initializeSampleCustomers();
  }

  private async initializeSampleData() {
    const sampleProducts: InsertProduct[] = [
      // --- Calibration Systems ---
      {
        name: "Resistance Decade Box",
        category: "Calibration Systems",
        subcategory: "Electrical Calibration",
        shortDescription: "Digital resistance decade box for industrial calibration.",
        fullTechnicalInfo: "High-accuracy resistance decade box for calibration labs and industrial use. Features robust construction and precise switching.",
        specifications: [
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Industrial" },
          { key: "Packing Type", value: "STD Wooden BOX" },
        ],
        featuresBenefits: [
          "High accuracy and stability",
          "Durable construction",
          "Easy to operate",
        ],
        applications: ["Calibration Labs", "Industrial Plants"],
        certifications: ["ISO 9001:2015", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "High Resistance Jig",
        category: "Calibration Systems",
        subcategory: "Electrical Calibration",
        shortDescription: "High resistance jig for precise calibration tasks.",
        fullTechnicalInfo: "Precision high resistance jig for laboratory and field calibration. Ensures accurate resistance measurements.",
        specifications: [
          { key: "Accuracy", value: "5.0%" },
          { key: "Decade Type", value: "Resistance" },
          { key: "Brand", value: "Reckonix" },
        ],
        featuresBenefits: [
          "Precision measurement",
          "Portable design",
        ],
        applications: ["Calibration Labs", "R&D"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "MEATEST M160i PRECISION DC CALIBRATOR",
        category: "Calibration Systems",
        subcategory: "Electrical Calibration",
        shortDescription: "Precision DC calibrator for laboratory use.",
        fullTechnicalInfo: "High-precision DC calibrator for voltage and current calibration. Suitable for laboratory and industrial applications.",
        specifications: [
          { key: "Accuracy", value: "0.01%" },
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Laboratory" },
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display",
        ],
        applications: ["Laboratory", "Calibration Centers"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "MEATEST 9010+ MULTIFUNCTION CALIBRATOR",
        category: "Calibration Systems",
        subcategory: "Electrical Calibration",
        shortDescription: "Multifunction calibrator for laboratory and field use.",
        fullTechnicalInfo: "Versatile multifunction calibrator for voltage, current, and resistance. Suitable for a wide range of calibration tasks.",
        specifications: [
          { key: "Model Name/Number", value: "MEATEST 9010+" },
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Laboratory" },
        ],
        featuresBenefits: [
          "Multifunction capability",
          "Portable design",
        ],
        applications: ["Laboratory", "Field Calibration"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "MEATEST 9010 MULTIFUNCTION CALIBRATOR",
        category: "Calibration Systems",
        subcategory: "Electrical Calibration",
        shortDescription: "Multiproduct calibrator for laboratory use.",
        fullTechnicalInfo: "High-accuracy multiproduct calibrator for voltage, current, and resistance. Ideal for calibration labs.",
        specifications: [
          { key: "Model Name/Number", value: "MEATEST 9010" },
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Laboratory" },
        ],
        featuresBenefits: [
          "High accuracy",
          "Multiproduct capability",
        ],
        applications: ["Calibration Labs"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Tape And Scale Calibration Unit",
        category: "Calibration Systems",
        subcategory: "Dimensional Calibration",
        shortDescription: "For calibration of tapes and scales up to 1000mm.",
        fullTechnicalInfo: "Precision calibration unit for tapes and scales. Suitable for industrial and laboratory use.",
        specifications: [
          { key: "Service Location", value: "pan india" },
          { key: "Measuring Range", value: "upto 1000mm" },
        ],
        featuresBenefits: [
          "Wide measuring range",
          "Robust construction",
        ],
        applications: ["Industrial", "Laboratory"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Analog Dial Calibration Tester",
        category: "Calibration Systems",
        subcategory: "Mechanical Calibration",
        shortDescription: "Digital analog dial calibration tester for industrial use.",
        fullTechnicalInfo: "High-accuracy analog dial calibration tester for industrial and laboratory use.",
        specifications: [
          { key: "Accuracy", value: "0.01%" },
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Industrial" },
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display",
        ],
        applications: ["Industrial", "Calibration Labs"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Stainless Steel Electronic Dial Calibration Tester",
        category: "Calibration Systems",
        subcategory: "Mechanical Calibration",
        shortDescription: "Stainless steel electronic dial calibration tester for industrial use.",
        fullTechnicalInfo: "Durable stainless steel electronic dial calibration tester for industrial and laboratory use.",
        specifications: [
          { key: "Material", value: "Stainless Steel" },
          { key: "Display Type", value: "Digital" },
          { key: "Usage/Application", value: "Industrial" },
        ],
        featuresBenefits: [
          "Stainless steel construction",
          "Digital display",
        ],
        applications: ["Industrial", "Calibration Labs"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Dial Calibration Tester",
        category: "Calibration Systems",
        subcategory: "Mechanical Calibration",
        shortDescription: "Digital dial calibration tester for industrial use.",
        fullTechnicalInfo: "High-accuracy dial calibration tester for industrial and laboratory use.",
        specifications: [
          { key: "Model Name/Number", value: "RXDCT25" },
          { key: "Material", value: "SS with sylvac dial" },
          { key: "Display Type", value: "Digital" },
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display",
        ],
        applications: ["Industrial", "Calibration Labs"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Steel Caliper Checker",
        category: "Calibration Systems",
        subcategory: "Dimensional Calibration",
        shortDescription: "Steel caliper checker for laboratory and industrial use.",
        fullTechnicalInfo: "Precision steel caliper checker for calibration of calipers up to 1000 mm.",
        specifications: [
          { key: "Measuring Range", value: "0 - 1000 mm" },
          { key: "Material", value: "Stainless Steel" },
          { key: "Usage/Application", value: "Laboratory" },
        ],
        featuresBenefits: [
          "Wide measuring range",
          "Stainless steel construction",
        ],
        applications: ["Laboratory", "Industrial"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      // --- Testing Systems ---
      {
        name: "Universal Testing Machine UTM-200",
        category: "Testing Systems",
        subcategory: "Universal Testing Machines",
        shortDescription: "Universal testing machine for tensile, compression, and flexural testing.",
        fullTechnicalInfo: "High-capacity universal testing machine designed for comprehensive material characterization and quality control testing.",
        specifications: [
          { key: "Load Capacity", value: "200 kN" },
          { key: "Load Accuracy", value: "±0.5% of indicated value" },
          { key: "Crosshead Speed", value: "0.001 to 500 mm/min" },
          { key: "Test Space", value: "600 mm" }
        ],
        featuresBenefits: [
          "High load capacity for various materials",
          "Precise load and displacement control",
          "Comprehensive test software package",
          "Automated test sequence capability"
        ],
        applications: ["Materials Research", "Quality Control", "R&D Labs", "Manufacturing"],
        certifications: ["ISO 9001:2015", "ASTM Standards", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Material Testing Machine MTM-100",
        category: "Testing Systems", 
        subcategory: "Universal Testing Machines",
        shortDescription: "Universal testing machine for tensile, compression, and flexural testing",
        fullTechnicalInfo: "High-capacity universal testing machine designed for comprehensive material characterization and quality control testing.",
        specifications: [
          { key: "Load Capacity", value: "100 kN" },
          { key: "Load Accuracy", value: "±0.5% of indicated value" },
          { key: "Crosshead Speed", value: "0.001 to 500 mm/min" },
          { key: "Test Space", value: "600 mm" }
        ],
        featuresBenefits: [
          "High load capacity for various materials",
          "Precise load and displacement control",
          "Comprehensive test software package",
          "Automated test sequence capability"
        ],
        applications: ["Materials Research", "Quality Control", "R&D Labs", "Manufacturing"],
        certifications: ["ISO 9001:2015", "ASTM Standards", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      // --- Measuring Instruments ---
      {
        name: "Vision Measuring Machine Manual 200",
        category: "Measuring Instruments",
        subcategory: "Optical Measurement Systems",
        shortDescription: "Manual vision measuring machine for industrial applications.",
        fullTechnicalInfo: "Manual vision measuring machine with high accuracy and robust construction. Suitable for industrial and laboratory use.",
        specifications: [
          { key: "Measuring Software", value: "Reckonix" },
          { key: "Automation Grade", value: "Manual" }
        ],
        featuresBenefits: [
          "High accuracy",
          "Manual operation"
        ],
        applications: ["Industry", "Laboratory"],
        certifications: ["ISO 9001:2015"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      // --- New Measuring Instruments from ATQ Metro ---
      {
        name: "ATQ Metro Digital Caliper",
        category: "Measuring Instruments",
        subcategory: "Dimensional Measurement Systems",
        shortDescription: "High-precision digital caliper for accurate dimensional measurements.",
        fullTechnicalInfo: "Professional digital caliper with LCD display and stainless steel construction. Features zero setting, data output, and IP67 protection.",
        specifications: [
          { key: "Measuring Range", value: "0-150mm" },
          { key: "Resolution", value: "0.01mm" },
          { key: "Accuracy", value: "±0.02mm" },
          { key: "Display", value: "LCD Digital" },
          { key: "Material", value: "Stainless Steel" }
        ],
        featuresBenefits: [
          "High precision measurement",
          "Digital LCD display",
          "Stainless steel construction",
          "IP67 protection",
          "Data output capability"
        ],
        applications: ["Manufacturing", "Quality Control", "Laboratory", "Metrology"],
        certifications: ["ISO 9001:2015", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: true,
      },
      {
        name: "ATQ Metro Micrometer Set",
        category: "Measuring Instruments",
        subcategory: "Dimensional Measurement Systems",
        shortDescription: "Precision micrometer set for accurate dimensional measurements.",
        fullTechnicalInfo: "Complete micrometer set with digital display and carbide-tipped measuring faces. Includes calibration certificate and protective case.",
        specifications: [
          { key: "Measuring Range", value: "0-25mm, 25-50mm, 50-75mm" },
          { key: "Resolution", value: "0.001mm" },
          { key: "Accuracy", value: "±0.002mm" },
          { key: "Display", value: "Digital LCD" },
          { key: "Material", value: "Hardened Steel" }
        ],
        featuresBenefits: [
          "High precision measurement",
          "Digital display",
          "Carbide-tipped faces",
          "Calibration certificate included",
          "Protective case"
        ],
        applications: ["Precision Engineering", "Quality Control", "Metrology", "Laboratory"],
        certifications: ["ISO 9001:2015", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "ATQ Metro Height Gauge",
        category: "Measuring Instruments",
        subcategory: "Dimensional Measurement Systems",
        shortDescription: "Digital height gauge for precise height and depth measurements.",
        fullTechnicalInfo: "Professional digital height gauge with large LCD display and magnetic base. Features zero setting, data output, and high accuracy.",
        specifications: [
          { key: "Measuring Range", value: "0-300mm" },
          { key: "Resolution", value: "0.01mm" },
          { key: "Accuracy", value: "±0.03mm" },
          { key: "Display", value: "Large LCD" },
          { key: "Base", value: "Magnetic" }
        ],
        featuresBenefits: [
          "High precision measurement",
          "Large LCD display",
          "Magnetic base",
          "Data output capability",
          "Zero setting function"
        ],
        applications: ["Manufacturing", "Quality Control", "Metrology", "Laboratory"],
        certifications: ["ISO 9001:2015", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      // --- New Testing Instruments from Sushma Industry ---
      {
        name: "Sushma Universal Testing Machine",
        category: "Testing Systems",
        subcategory: "Universal Testing Machines",
        shortDescription: "Computer-controlled universal testing machine for material testing.",
        fullTechnicalInfo: "Advanced universal testing machine with computer control, load cell, and extensometer. Suitable for tensile, compression, and flexural testing.",
        specifications: [
          { key: "Maximum Load", value: "1000kN" },
          { key: "Load Accuracy", value: "±0.5%" },
          { key: "Control System", value: "Computer Controlled" },
          { key: "Test Types", value: "Tensile, Compression, Flexural" },
          { key: "Display", value: "Digital LCD" }
        ],
        featuresBenefits: [
          "Computer-controlled operation",
          "High load capacity",
          "Multiple test types",
          "Precise load measurement",
          "Data logging capability"
        ],
        applications: ["Material Testing", "Quality Control", "Research & Development", "Laboratory"],
        certifications: ["ISO 9001:2015", "ASTM Standards"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: true,
      },
      {
        name: "Sushma Hardness Tester",
        category: "Testing Systems",
        subcategory: "Universal Testing Machines",
        shortDescription: "Digital hardness tester for material hardness measurement.",
        fullTechnicalInfo: "Advanced digital hardness tester with automatic loading and measurement. Supports multiple hardness scales including Rockwell, Brinell, and Vickers.",
        specifications: [
          { key: "Hardness Scales", value: "Rockwell, Brinell, Vickers" },
          { key: "Load Range", value: "1-3000kgf" },
          { key: "Accuracy", value: "±1%" },
          { key: "Display", value: "Digital LCD" },
          { key: "Control", value: "Automatic" }
        ],
        featuresBenefits: [
          "Multiple hardness scales",
          "Automatic operation",
          "High accuracy",
          "Digital display",
          "Data storage capability"
        ],
        applications: ["Material Testing", "Quality Control", "Metallurgy", "Laboratory"],
        certifications: ["ISO 9001:2015", "ASTM Standards"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
      {
        name: "Sushma Impact Testing Machine",
        category: "Testing Systems",
        subcategory: "Dynamic and Fatigue Testing Machines",
        shortDescription: "Charpy impact testing machine for material toughness evaluation.",
        fullTechnicalInfo: "Computer-controlled Charpy impact testing machine with automatic pendulum release and energy measurement. Suitable for impact testing of metals and plastics.",
        specifications: [
          { key: "Impact Energy", value: "300J" },
          { key: "Accuracy", value: "±1%" },
          { key: "Control System", value: "Computer Controlled" },
          { key: "Test Type", value: "Charpy Impact" },
          { key: "Display", value: "Digital LCD" }
        ],
        featuresBenefits: [
          "Computer-controlled operation",
          "Automatic pendulum release",
          "High accuracy measurement",
          "Data logging capability",
          "Safety features"
        ],
        applications: ["Material Testing", "Quality Control", "Metallurgy", "Research"],
        certifications: ["ISO 9001:2015", "ASTM Standards"],
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        imageGallery: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        catalogPdfUrl: "",
        homeFeatured: false,
      },
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(category?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    if (category) {
      return products.filter(product => product.category === category);
    }
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      views: 0,
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async incrementProductViews(id: number): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      product.views += 1;
      this.products.set(id, product);
    }
  }

  // Quote methods
  async getAllQuotes(): Promise<QuoteRequest[]> {
    return Array.from(this.quotes.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getQuote(id: number): Promise<QuoteRequest | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id, 
      status: 'New',
      createdAt: new Date() 
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuoteStatus(id: number, status: 'New' | 'Contacted' | 'Closed'): Promise<QuoteRequest | undefined> {
    const quote = this.quotes.get(id);
    if (!quote) return undefined;

    quote.status = status;
    this.quotes.set(id, quote);
    return quote;
  }

  // Contact message methods
  async getAllMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getMessage(id: number): Promise<ContactMessage | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      replied: false,
      createdAt: new Date() 
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageReplied(id: number, replied: boolean): Promise<ContactMessage | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;

    message.replied = replied;
    this.messages.set(id, message);
    return message;
  }

  private async initializeSampleEvents() {
    const sampleEvents: InsertCompanyEvent[] = [
      {
        title: "ISO 17025 Accreditation Renewed",
        description: "Reckonix has successfully renewed its ISO 17025 accreditation for calibration services, ensuring continued compliance with international standards.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: new Date("2024-01-15"),
        published: true
      },
      {
        title: "New R&D Facility Inauguration",
        description: "Our state-of-the-art research and development facility was inaugurated, expanding our capabilities in precision instrument development.",
        imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: new Date("2024-02-20"),
        published: true
      },
      {
        title: "Partnership with Global Aerospace Leader",
        description: "Reckonix announces strategic partnership with leading aerospace manufacturer to provide advanced calibration solutions for next-generation aircraft.",
        imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: new Date("2024-03-10"),
        published: true
      }
    ];

    for (const event of sampleEvents) {
      await this.createEvent(event);
    }
  }

  // Analytics methods
  async getWebsiteViews(): Promise<number> {
    return Array.from(this.viewData.values()).reduce((total, data) => total + data.count, 0);
  }

  async incrementWebsiteViews(ip?: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    let viewData = this.viewData.get(today);

    if (!viewData) {
      viewData = {
        id: this.currentViewId++,
        date: today,
        count: 0,
        lastViewedIPs: []
      };
    }

    // Simple IP-based rate limiting (one view per IP per day)
    if (!ip || !viewData.lastViewedIPs.includes(ip)) {
      viewData.count += 1;
      if (ip) {
        viewData.lastViewedIPs.push(ip);
        // Keep only last 100 IPs to prevent memory issues
        if (viewData.lastViewedIPs.length > 100) {
          viewData.lastViewedIPs = viewData.lastViewedIPs.slice(-100);
        }
      }
    }

    this.viewData.set(today, viewData);
  }

  async getProductViews(): Promise<{ productId: number; views: number; productName: string }[]> {
    return Array.from(this.products.values()).map(product => ({
      productId: product.id,
      views: product.views,
      productName: product.name
    }));
  }

  // Company Events methods
  async getAllEvents(): Promise<CompanyEvent[]> {
    return Array.from(this.events.values())
      .filter(event => event.published)
      .sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());
  }

  async getEvent(id: number): Promise<CompanyEvent | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertCompanyEvent): Promise<CompanyEvent> {
    const id = this.currentEventId++;
    const event: CompanyEvent = { 
      ...insertEvent, 
      id, 
      createdAt: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, updateData: Partial<InsertCompanyEvent>): Promise<CompanyEvent | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;

    const updatedEvent = { ...event, ...updateData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Main Catalog methods
  async getMainCatalog(): Promise<MainCatalog | undefined> {
    return this.mainCatalog;
  }

  async updateMainCatalog(insertCatalog: InsertMainCatalog): Promise<MainCatalog> {
    const catalog: MainCatalog = {
      id: 1,
      ...insertCatalog,
      lastUpdated: new Date()
    };
    this.mainCatalog = catalog;
    return catalog;
  }

  private async initializeSampleCustomers() {
    const sampleCustomers: InsertCustomer[] = [
      {
        name: "TechCorp Industries",
        logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
        category: "Technology",
        description: "Leading technology solutions provider",
        industry: "Aerospace & Defense",
        featured: true
      },
      {
        name: "Precision Manufacturing",
        logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop",
        category: "Manufacturing",
        description: "Advanced precision manufacturing",
        industry: "Automotive Manufacturing",
        featured: true
      },
      {
        name: "AeroSpace Solutions",
        logoUrl: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=200&h=100&fit=crop",
        category: "Aerospace",
        description: "Comprehensive aerospace solutions",
        industry: "Aerospace & Defense",
        featured: true
      },
      {
        name: "AutoTech Systems",
        logoUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=100&fit=crop",
        category: "Automotive",
        description: "Automotive technology systems",
        industry: "Automotive Manufacturing",
        featured: false
      },
      {
        name: "BioMed Research",
        logoUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop",
        category: "Healthcare",
        description: "Biomedical research and development",
        industry: "Pharmaceutical & Biotech",
        featured: false
      },
      {
        name: "Energy Dynamics",
        logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop",
        category: "Energy",
        description: "Dynamic energy solutions",
        industry: "Oil & Gas",
        featured: false
      }
    ];

    for (const customer of sampleCustomers) {
      await this.createCustomer(customer);
    }
  }

  // Customer methods
  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = { 
      ...insertCustomer, 
      id, 
      createdAt: new Date() 
    };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: number, updateData: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;

    const updatedCustomer = { ...customer, ...updateData };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async deleteCustomer(id: number): Promise<boolean> {
    return this.customers.delete(id);
  }

  // Job methods
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const job: Job = {
      id: this.currentJobId++,
      ...insertJob,
      createdAt: new Date()
    };
    this.jobs.set(job.id, job);
    return job;
  }

  async deleteJob(id: number): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // Job Application methods
  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values());
  }

  async createJobApplication(app: InsertJobApplication): Promise<JobApplication> {
    const jobApp: JobApplication = {
      id: this.currentJobAppId++,
      ...app,
      createdAt: new Date()
    };
    this.jobApplications.set(jobApp.id, jobApp);
    return jobApp;
  }
}

export const storage = new MemStorage();

// In-memory complaints storage (replace with DB in production)
export const complaints: Complaint[] = [];

export function addComplaint(complaint: Complaint) {
  complaints.push(complaint);
}

export function getComplaints() {
  return complaints;
}

export const chatbotSummaries: ChatbotSummary[] = [];

export function addChatbotSummary(summary: ChatbotSummary) {
  chatbotSummaries.push(summary);
}

export function getChatbotSummaries() {
  return chatbotSummaries;
}

export function getAllProducts() {
  return storage.getAllProducts();
}

// In-memory categories
let categories: Category[] = [
  { id: 1, name: "Calibration Systems", subcategories: [
    "Pressure Calibration",
    "Temperature Calibration",
    "Flow Calibration",
    "Electrical Calibration",
    "Mechanical Calibration",
    "Dimensional Calibration",
    "Mass and Weight Calibration",
    "Thermal Calibration"
  ] },
  { id: 2, name: "Measuring Instruments", subcategories: [
    "Dimensional Measurement Systems",
    "Optical Measurement Systems",
    "Coordinate Measurement Systems",
    "Roughness Measurement Systems",
    "Profile Measurement Systems"
  ] },
  { id: 3, name: "Testing Systems", subcategories: [
    "Universal Testing Machines",
    "Dynamic and Fatigue Testing Machines",
    "Torsion Testing Machines",
    "Single Purpose Test Machines",
    "Customized Testing Solutions"
  ] }
];

export const getAllCategories = async (): Promise<Category[]> => {
  return categories;
};

export const createCategory = async (data: InsertCategory): Promise<Category> => {
  const newCategory: Category = {
    id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    ...data
  };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id: number, data: Partial<InsertCategory>): Promise<Category | null> => {
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return null;
  categories[idx] = { ...categories[idx], ...data };
  return categories[idx];
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
};
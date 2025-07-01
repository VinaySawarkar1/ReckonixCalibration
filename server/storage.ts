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
  InsertCustomer
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
      {
        name: "Digital Pressure Calibrator DPC-5000",
        category: "Calibration Systems",
        shortDescription: "High-precision digital calibrator for pressure measurement with advanced automation features",
        fullTechnicalInfo: "Advanced digital pressure calibrator designed for high-precision calibration of pressure measuring instruments. Features automated calibration sequences, data logging capabilities, and compliance with international standards.",
        specifications: [
          { key: "Pressure Range", value: "0 to 1000 PSI (0 to 6895 kPa)" },
          { key: "Accuracy", value: "±0.025% of reading" },
          { key: "Resolution", value: "0.001 PSI" },
          { key: "Operating Temperature", value: "-10°C to +50°C" },
          { key: "Power Supply", value: "100-240V AC, 50/60Hz" },
          { key: "Communication", value: "USB 2.0, RS-232, Ethernet" }
        ],
        featuresBenefits: [
          "Automated calibration sequences reduce human error",
          "Comprehensive data logging with export capabilities",
          "Multi-interface connectivity for flexible integration",
          "User-friendly calibration software with step-by-step guidance"
        ],
        applications: [
          "Aerospace Industry",
          "Automotive Manufacturing", 
          "Pharmaceutical",
          "Oil & Gas",
          "Power Generation",
          "Marine Industry"
        ],
        certifications: [
          "ISO 9001:2015",
          "NIST Traceable",
          "CE Marking",
          "ISO 17025",
          "RoHS Compliant",
          "FCC Certified"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        catalogPdfUrl: ""
      },
      {
        name: "Temperature Calibrator TC-200",
        category: "Calibration Systems",
        shortDescription: "Advanced temperature calibration system with multi-point referencing capability",
        fullTechnicalInfo: "Precision temperature calibrator with wide range coverage and exceptional accuracy for laboratory and field applications.",
        specifications: [
          { key: "Temperature Range", value: "-200°C to +1200°C" },
          { key: "Accuracy", value: "±0.1°C" },
          { key: "Stability", value: "±0.05°C" },
          { key: "Sensor Types", value: "RTD, Thermocouple, Thermistor" }
        ],
        featuresBenefits: [
          "Wide temperature range coverage",
          "High accuracy and stability",
          "Multiple sensor type support",
          "Portable design for field use"
        ],
        applications: ["Pharmaceutical", "Food Processing", "HVAC", "Aerospace"],
        certifications: ["ISO 9001:2015", "NIST Traceable", "CE Marking"],
        imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Material Testing Machine MTM-100",
        category: "Testing Systems", 
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
        imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        name: "Digital Multimeter DMM-6500",
        category: "Measuring Instruments",
        shortDescription: "High-precision digital multimeter with advanced measurement capabilities", 
        fullTechnicalInfo: "Professional-grade digital multimeter offering exceptional accuracy and versatility for electrical measurements.",
        specifications: [
          { key: "DC Voltage", value: "100 mV to 1000 V" },
          { key: "AC Voltage", value: "100 mV to 750 V" },
          { key: "Resistance", value: "100 Ω to 100 MΩ" },
          { key: "Accuracy", value: "±0.0035%" }
        ],
        featuresBenefits: [
          "High accuracy measurements",
          "Wide measurement range",
          "Data logging capability",
          "PC connectivity"
        ],
        applications: ["Electronics Testing", "Electrical Maintenance", "R&D", "Education"],
        certifications: ["ISO 9001:2015", "CE Marking", "RoHS Compliant"],
        imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      }
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
}

export const storage = new MemStorage();
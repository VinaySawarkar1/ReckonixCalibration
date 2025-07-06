// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  products;
  quotes;
  messages;
  viewData;
  events;
  mainCatalog;
  customers;
  currentUserId;
  currentProductId;
  currentQuoteId;
  currentMessageId;
  currentViewId;
  currentEventId;
  currentCustomerId;
  jobs = /* @__PURE__ */ new Map();
  jobApplications = /* @__PURE__ */ new Map();
  currentJobId = 1;
  currentJobAppId = 1;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.quotes = /* @__PURE__ */ new Map();
    this.messages = /* @__PURE__ */ new Map();
    this.viewData = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.mainCatalog = void 0;
    this.customers = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentQuoteId = 1;
    this.currentMessageId = 1;
    this.currentViewId = 1;
    this.currentEventId = 1;
    this.currentCustomerId = 1;
    this.createUser({
      username: "admin",
      password: "admin123",
      // In real app, this would be hashed
      role: "admin"
    });
    this.initializeSampleData();
    this.initializeSampleEvents();
    this.initializeSampleCustomers();
  }
  async initializeSampleData() {
    const sampleProducts = [
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
          { key: "Packing Type", value: "STD Wooden BOX" }
        ],
        featuresBenefits: [
          "High accuracy and stability",
          "Durable construction",
          "Easy to operate"
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
        homeFeatured: false
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
          { key: "Brand", value: "Reckonix" }
        ],
        featuresBenefits: [
          "Precision measurement",
          "Portable design"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Laboratory" }
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Laboratory" }
        ],
        featuresBenefits: [
          "Multifunction capability",
          "Portable design"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Laboratory" }
        ],
        featuresBenefits: [
          "High accuracy",
          "Multiproduct capability"
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
        homeFeatured: false
      },
      {
        name: "Tape And Scale Calibration Unit",
        category: "Calibration Systems",
        subcategory: "Dimensional Calibration",
        shortDescription: "For calibration of tapes and scales up to 1000mm.",
        fullTechnicalInfo: "Precision calibration unit for tapes and scales. Suitable for industrial and laboratory use.",
        specifications: [
          { key: "Service Location", value: "pan india" },
          { key: "Measuring Range", value: "upto 1000mm" }
        ],
        featuresBenefits: [
          "Wide measuring range",
          "Robust construction"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Industrial" }
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Industrial" }
        ],
        featuresBenefits: [
          "Stainless steel construction",
          "Digital display"
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
        homeFeatured: false
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
          { key: "Display Type", value: "Digital" }
        ],
        featuresBenefits: [
          "High accuracy",
          "Digital display"
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
        homeFeatured: false
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
          { key: "Usage/Application", value: "Laboratory" }
        ],
        featuresBenefits: [
          "Wide measuring range",
          "Stainless steel construction"
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
        homeFeatured: false
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
          { key: "Load Accuracy", value: "\xB10.5% of indicated value" },
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
        homeFeatured: false
      },
      {
        name: "Material Testing Machine MTM-100",
        category: "Testing Systems",
        subcategory: "Universal Testing Machines",
        shortDescription: "Universal testing machine for tensile, compression, and flexural testing",
        fullTechnicalInfo: "High-capacity universal testing machine designed for comprehensive material characterization and quality control testing.",
        specifications: [
          { key: "Load Capacity", value: "100 kN" },
          { key: "Load Accuracy", value: "\xB10.5% of indicated value" },
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
        homeFeatured: false
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
        homeFeatured: false
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
          { key: "Accuracy", value: "\xB10.02mm" },
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
        homeFeatured: true
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
          { key: "Accuracy", value: "\xB10.002mm" },
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
        homeFeatured: false
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
          { key: "Accuracy", value: "\xB10.03mm" },
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
        homeFeatured: false
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
          { key: "Load Accuracy", value: "\xB10.5%" },
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
        homeFeatured: true
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
          { key: "Accuracy", value: "\xB11%" },
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
        homeFeatured: false
      },
      {
        name: "Sushma Impact Testing Machine",
        category: "Testing Systems",
        subcategory: "Dynamic and Fatigue Testing Machines",
        shortDescription: "Charpy impact testing machine for material toughness evaluation.",
        fullTechnicalInfo: "Computer-controlled Charpy impact testing machine with automatic pendulum release and energy measurement. Suitable for impact testing of metals and plastics.",
        specifications: [
          { key: "Impact Energy", value: "300J" },
          { key: "Accuracy", value: "\xB11%" },
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
        homeFeatured: false
      }
    ];
    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  // Product methods
  async getAllProducts(category) {
    const products = Array.from(this.products.values());
    if (category) {
      return products.filter((product) => product.category === category);
    }
    return products;
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = {
      ...insertProduct,
      id,
      views: 0,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.products.set(id, product);
    return product;
  }
  async updateProduct(id, updateData) {
    const product = this.products.get(id);
    if (!product) return void 0;
    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  async deleteProduct(id) {
    return this.products.delete(id);
  }
  async incrementProductViews(id) {
    const product = this.products.get(id);
    if (product) {
      product.views += 1;
      this.products.set(id, product);
    }
  }
  // Quote methods
  async getAllQuotes() {
    return Array.from(this.quotes.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getQuote(id) {
    return this.quotes.get(id);
  }
  async createQuote(insertQuote) {
    const id = this.currentQuoteId++;
    const quote = {
      ...insertQuote,
      id,
      status: "New",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.quotes.set(id, quote);
    return quote;
  }
  async updateQuoteStatus(id, status) {
    const quote = this.quotes.get(id);
    if (!quote) return void 0;
    quote.status = status;
    this.quotes.set(id, quote);
    return quote;
  }
  // Contact message methods
  async getAllMessages() {
    return Array.from(this.messages.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getMessage(id) {
    return this.messages.get(id);
  }
  async createMessage(insertMessage) {
    const id = this.currentMessageId++;
    const message = {
      ...insertMessage,
      id,
      replied: false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.messages.set(id, message);
    return message;
  }
  async markMessageReplied(id, replied) {
    const message = this.messages.get(id);
    if (!message) return void 0;
    message.replied = replied;
    this.messages.set(id, message);
    return message;
  }
  async initializeSampleEvents() {
    const sampleEvents = [
      {
        title: "ISO 17025 Accreditation Renewed",
        description: "Reckonix has successfully renewed its ISO 17025 accreditation for calibration services, ensuring continued compliance with international standards.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: /* @__PURE__ */ new Date("2024-01-15"),
        published: true
      },
      {
        title: "New R&D Facility Inauguration",
        description: "Our state-of-the-art research and development facility was inaugurated, expanding our capabilities in precision instrument development.",
        imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: /* @__PURE__ */ new Date("2024-02-20"),
        published: true
      },
      {
        title: "Partnership with Global Aerospace Leader",
        description: "Reckonix announces strategic partnership with leading aerospace manufacturer to provide advanced calibration solutions for next-generation aircraft.",
        imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        eventDate: /* @__PURE__ */ new Date("2024-03-10"),
        published: true
      }
    ];
    for (const event of sampleEvents) {
      await this.createEvent(event);
    }
  }
  // Analytics methods
  async getWebsiteViews() {
    return Array.from(this.viewData.values()).reduce((total, data) => total + data.count, 0);
  }
  async incrementWebsiteViews(ip) {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let viewData = this.viewData.get(today);
    if (!viewData) {
      viewData = {
        id: this.currentViewId++,
        date: today,
        count: 0,
        lastViewedIPs: []
      };
    }
    if (!ip || !viewData.lastViewedIPs.includes(ip)) {
      viewData.count += 1;
      if (ip) {
        viewData.lastViewedIPs.push(ip);
        if (viewData.lastViewedIPs.length > 100) {
          viewData.lastViewedIPs = viewData.lastViewedIPs.slice(-100);
        }
      }
    }
    this.viewData.set(today, viewData);
  }
  async getProductViews() {
    return Array.from(this.products.values()).map((product) => ({
      productId: product.id,
      views: product.views,
      productName: product.name
    }));
  }
  // Company Events methods
  async getAllEvents() {
    return Array.from(this.events.values()).filter((event) => event.published).sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async createEvent(insertEvent) {
    const id = this.currentEventId++;
    const event = {
      ...insertEvent,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.events.set(id, event);
    return event;
  }
  async updateEvent(id, updateData) {
    const event = this.events.get(id);
    if (!event) return void 0;
    const updatedEvent = { ...event, ...updateData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  async deleteEvent(id) {
    return this.events.delete(id);
  }
  // Main Catalog methods
  async getMainCatalog() {
    return this.mainCatalog;
  }
  async updateMainCatalog(insertCatalog) {
    const catalog = {
      id: 1,
      ...insertCatalog,
      lastUpdated: /* @__PURE__ */ new Date()
    };
    this.mainCatalog = catalog;
    return catalog;
  }
  async initializeSampleCustomers() {
    const sampleCustomers = [
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
  async getAllCustomers() {
    return Array.from(this.customers.values());
  }
  async getCustomer(id) {
    return this.customers.get(id);
  }
  async createCustomer(insertCustomer) {
    const id = this.currentCustomerId++;
    const customer = {
      ...insertCustomer,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.customers.set(id, customer);
    return customer;
  }
  async updateCustomer(id, updateData) {
    const customer = this.customers.get(id);
    if (!customer) return void 0;
    const updatedCustomer = { ...customer, ...updateData };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }
  async deleteCustomer(id) {
    return this.customers.delete(id);
  }
  // Job methods
  async getAllJobs() {
    return Array.from(this.jobs.values());
  }
  async getJob(id) {
    return this.jobs.get(id);
  }
  async createJob(insertJob) {
    const job = {
      id: this.currentJobId++,
      ...insertJob,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.jobs.set(job.id, job);
    return job;
  }
  async deleteJob(id) {
    return this.jobs.delete(id);
  }
  // Job Application methods
  async getAllJobApplications() {
    return Array.from(this.jobApplications.values());
  }
  async createJobApplication(app2) {
    const jobApp = {
      id: this.currentJobAppId++,
      ...app2,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.jobApplications.set(jobApp.id, jobApp);
    return jobApp;
  }
};
var storage = new MemStorage();
var complaints = [];
function addComplaint(complaint) {
  complaints.push(complaint);
}
var chatbotSummaries = [];
function addChatbotSummary(summary) {
  chatbotSummaries.push(summary);
}
function getChatbotSummaries() {
  return chatbotSummaries;
}
var categories = [
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
var getAllCategories = async () => {
  return categories;
};
var createCategory = async (data) => {
  const newCategory = {
    id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
    ...data
  };
  categories.push(newCategory);
  return newCategory;
};
var updateCategory = async (id, data) => {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  categories[idx] = { ...categories[idx], ...data };
  return categories[idx];
};
var deleteCategory = async (id) => {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
};

// shared/schema.ts
import { z } from "zod";
var userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["admin"]).default("admin"),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  role: z.enum(["admin"]).default("admin")
});
var productSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string(),
  shortDescription: z.string(),
  fullTechnicalInfo: z.string(),
  specifications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  featuresBenefits: z.array(z.string()),
  applications: z.array(z.string()),
  certifications: z.array(z.string()),
  imageUrl: z.string(),
  imageGallery: z.array(z.string()).default([]),
  catalogPdfUrl: z.string().optional(),
  datasheetPdfUrl: z.string().optional(),
  technicalDetails: z.object({
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    powerRequirements: z.string().optional(),
    operatingConditions: z.string().optional(),
    warranty: z.string().optional(),
    compliance: z.array(z.string()).default([])
  }).optional(),
  views: z.number().default(0),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
  homeFeatured: z.boolean().default(false)
});
var insertProductSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string(),
  subcategory: z.string(),
  shortDescription: z.string().min(1).max(500),
  fullTechnicalInfo: z.string().min(1),
  specifications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).default([]),
  featuresBenefits: z.array(z.string()).default([]),
  applications: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  imageUrl: z.string().min(1),
  imageGallery: z.array(z.string()).default([]),
  catalogPdfUrl: z.string().optional().or(z.literal("")),
  datasheetPdfUrl: z.string().optional().or(z.literal("")),
  technicalDetails: z.object({
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    powerRequirements: z.string().optional(),
    operatingConditions: z.string().optional(),
    warranty: z.string().optional(),
    compliance: z.array(z.string()).default([])
  }).optional(),
  homeFeatured: z.boolean().default(false)
});
var quoteRequestSchema = z.object({
  id: z.number(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  customerLocation: z.string().optional(),
  products: z.array(z.object({
    productId: z.number(),
    name: z.string(),
    quantity: z.number().positive()
  })),
  message: z.string().optional(),
  status: z.enum(["New", "Contacted", "Closed"]).default("New"),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertQuoteRequestSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(5).max(20),
  customerLocation: z.string().optional(),
  products: z.array(z.object({
    productId: z.number(),
    name: z.string(),
    quantity: z.number().positive()
  })).min(1),
  message: z.string().optional()
});
var contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  replied: z.boolean().default(false),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertContactMessageSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2e3)
});
var viewDataSchema = z.object({
  id: z.number(),
  date: z.string(),
  // Date in YYYY-MM-DD format
  count: z.number().default(0),
  lastViewedIPs: z.array(z.string()).default([])
});
var companyEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  eventDate: z.date(),
  published: z.boolean().default(true),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertCompanyEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1e3),
  imageUrl: z.string().min(1),
  eventDate: z.date(),
  published: z.boolean().default(true)
});
var mainCatalogSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  pdfUrl: z.string(),
  fileSize: z.string().optional(),
  lastUpdated: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertMainCatalogSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  pdfUrl: z.string().min(1),
  fileSize: z.string().optional()
});
var loginSchema = z.object({
  username: z.string(),
  password: z.string()
});
var customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  logoUrl: z.string(),
  category: z.string(),
  description: z.string().optional(),
  website: z.string().optional(),
  industry: z.string(),
  featured: z.boolean().default(false),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertCustomerSchema = z.object({
  name: z.string().min(1).max(200),
  logoUrl: z.string().min(1),
  category: z.string().min(1).max(100),
  description: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().min(1).max(100),
  featured: z.boolean().default(false)
});
var jobSchema = z.object({
  id: z.number(),
  title: z.string(),
  location: z.string(),
  experience: z.string(),
  description: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertJobSchema = z.object({
  title: z.string().min(1).max(200),
  location: z.string().min(1).max(100),
  experience: z.string().min(1).max(100),
  description: z.string().min(1).max(2e3)
});
var jobApplicationSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  location: z.string(),
  experience: z.string(),
  resumeUrl: z.string(),
  jobId: z.number(),
  jobTitle: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
var insertJobApplicationSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  location: z.string().min(1).max(100),
  experience: z.string().min(1).max(100),
  resumeUrl: z.string().min(1),
  jobId: z.number(),
  jobTitle: z.string().min(1).max(200)
});
var categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  subcategories: z.array(z.string())
});
var insertCategorySchema = z.object({
  name: z.string().min(1).max(100),
  subcategories: z.array(z.string())
});

// server/routes.ts
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var router = express.Router();
var chatSessions = {};
async function registerRoutes(app2) {
  const uploadsDir = path.join(__dirname, "..", "uploads", "products");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });
  const productUpload = multer({
    storage: storageConfig,
    limits: {
      fileSize: 5 * 1024 * 1024,
      // 5MB limit
      files: 10
      // Maximum 10 files
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({
        user: { id: user.id, username: user.username, role: user.role },
        token: `mock-jwt-${user.id}`
        // Mock token for demo
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category;
      let products = await storage.getAllProducts(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await storage.incrementProductViews(id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.post("/api/products", productUpload.array("images", 10), async (req, res) => {
    try {
      const uploadedFiles = req.files;
      const imageUrls = [];
      if (uploadedFiles && uploadedFiles.length > 0) {
        imageUrls.push(...uploadedFiles.map((file) => `/uploads/products/${file.filename}`));
      }
      const productData = {
        ...req.body,
        imageUrl: imageUrls[0] || req.body.imageUrl || "",
        // First image as main image
        imageGallery: imageUrls.length > 0 ? imageUrls : req.body.imageGallery ? JSON.parse(req.body.imageGallery) : []
      };
      if (typeof productData.homeFeatured === "string") {
        productData.homeFeatured = productData.homeFeatured === "true";
      }
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
  app2.put("/api/products/:id", productUpload.array("images", 10), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const uploadedFiles = req.files;
      const imageUrls = [];
      if (uploadedFiles && uploadedFiles.length > 0) {
        imageUrls.push(...uploadedFiles.map((file) => `/uploads/products/${file.filename}`));
      }
      const productData = {
        ...req.body,
        imageUrl: imageUrls[0] || req.body.imageUrl || "",
        // First image as main image
        imageGallery: imageUrls.length > 0 ? imageUrls : req.body.imageGallery ? JSON.parse(req.body.imageGallery) : []
      };
      if (typeof productData.homeFeatured === "string") {
        productData.homeFeatured = productData.homeFeatured === "true";
      }
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
      console.error("Product update error:", error);
      console.error("Product data received:", req.body);
      res.status(400).json({ message: "Invalid product data" });
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    try {
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
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await getAllCategories();
      res.json(categories2);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.post("/api/categories", async (req, res) => {
    try {
      const { name, subcategories } = req.body;
      if (!name || !subcategories || !Array.isArray(subcategories)) {
        return res.status(400).json({ error: "Invalid category data" });
      }
      const newCategory = await createCategory({ name, subcategories });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });
  app2.put("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, subcategories } = req.body;
      if (!name || !subcategories || !Array.isArray(subcategories)) {
        return res.status(400).json({ error: "Invalid category data" });
      }
      const updatedCategory = await updateCategory(id, { name, subcategories });
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Failed to update category" });
    }
  });
  app2.delete("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await deleteCategory(id);
      if (!success) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  });
  app2.post("/api/quotes", async (req, res) => {
    try {
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
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
  app2.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });
  app2.put("/api/quotes/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (isNaN(id) || !["New", "Contacted", "Closed"].includes(status)) {
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
  app2.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      console.log("New contact message:", message);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });
  app2.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.put("/api/messages/:id/replied", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { replied } = req.body;
      if (isNaN(id) || typeof replied !== "boolean") {
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
  app2.get("/api/analytics/website-views", async (req, res) => {
    try {
      const views = await storage.getWebsiteViews();
      res.json({ totalViews: views });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch website views" });
    }
  });
  app2.post("/api/analytics/website-views", async (req, res) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      await storage.incrementWebsiteViews(ip);
      res.json({ message: "View recorded" });
    } catch (error) {
      res.status(500).json({ message: "Failed to record view" });
    }
  });
  app2.get("/api/analytics/product-views", async (req, res) => {
    try {
      const productViews = await storage.getProductViews();
      res.json(productViews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product views" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
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
  app2.post("/api/events", async (req, res) => {
    try {
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
  app2.put("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      const eventData = insertCompanyEventSchema.partial().parse({
        ...req.body,
        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : void 0
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
  app2.delete("/api/events/:id", async (req, res) => {
    try {
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
  app2.get("/api/catalog/main-catalog", async (req, res) => {
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
  app2.post("/api/catalog/main-catalog", async (req, res) => {
    try {
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
  app2.get("/api/customers", async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customers" });
    }
  });
  app2.get("/api/customers/:id", async (req, res) => {
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
  app2.post("/api/customers", async (req, res) => {
    try {
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
  app2.put("/api/customers/:id", async (req, res) => {
    try {
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
  app2.delete("/api/customers/:id", async (req, res) => {
    try {
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
  const uploadDir = path.join(__dirname, "../uploads/resumes");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const upload = multer({ dest: uploadDir });
  app2.get("/api/jobs", async (req, res) => {
    const jobs = await storage.getAllJobs();
    res.json(jobs);
  });
  app2.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ message: "Invalid job data" });
    }
  });
  app2.delete("/api/jobs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid job ID" });
    const deleted = await storage.deleteJob(id);
    if (!deleted) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  });
  app2.post("/api/apply", upload.single("resume"), async (req, res) => {
    try {
      const { name, email, location, experience, jobId } = req.body;
      const job = await storage.getJob(Number(jobId));
      if (!job) return res.status(400).json({ message: "Invalid job" });
      if (!req.file) return res.status(400).json({ message: "Resume required" });
      const resumeUrl = `/uploads/resumes/${req.file.filename}`;
      const appData = insertJobApplicationSchema.parse({
        name,
        email,
        location,
        experience,
        resumeUrl,
        jobId: Number(jobId),
        jobTitle: job.title
      });
      const application = await storage.createJobApplication(appData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });
  app2.get("/api/applications", async (req, res) => {
    const applications = await storage.getAllJobApplications();
    res.json(applications);
  });
  app2.use("/uploads/resumes", (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });
  app2.use("/uploads/products", (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });
  router.post("/api/chatbot", async (req, res) => {
    const { message, sessionId } = req.body;
    const text = message?.toLowerCase() || "";
    let reply = "Sorry, I didn't understand that. Can you rephrase or provide more details?";
    let session = chatSessions[sessionId] || {};
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
      addComplaint({
        id: uuidv4(),
        ...session.complaint,
        status: "open",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      addChatbotSummary({
        sessionId,
        type: "complaint",
        name: session.complaint.name,
        email: session.complaint.email,
        message: session.complaint.message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      reply = "Your complaint/requirement has been submitted. Our team will contact you soon. Is there anything else I can help with?";
      session = {};
    } else if (text.includes("complaint") || text.includes("issue") || text.includes("problem") || text.includes("requirement")) {
      reply = "I'm sorry to hear that. Please describe your complaint or requirement in detail.";
      session = { awaiting: "complaint_detail", complaint: {} };
    } else if (text.includes("product") || text.includes("catalog")) {
      addChatbotSummary({
        sessionId,
        type: "product_inquiry",
        message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      reply = "We offer a wide range of calibration, testing, and measuring systems. Would you like to see our product catalog or need help choosing a product?";
    } else if (text.includes("contact") || text.includes("support") || text.includes("help")) {
      addChatbotSummary({
        sessionId,
        type: "support_inquiry",
        message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      reply = "You can reach our support team at support@reckonix.com or call +91-12345-67890. How else can I assist you?";
    } else if (text.includes("company") || text.includes("about")) {
      addChatbotSummary({
        sessionId,
        type: "company_info",
        message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      reply = "Reckonix is a leader in precision calibration, testing, and measuring systems. Let me know if you want more details about our company or services.";
    }
    chatSessions[sessionId] = session;
    console.log("Chatbot received:", { message, sessionId, reply });
    res.json({ reply });
  });
  router.get("/api/chatbot-summaries", (req, res) => {
    res.json(getChatbotSummaries());
  });
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
  router.get("/api/products", async (req, res) => {
    const { search } = req.query;
    let products = await storage.getAllProducts();
    if (search) {
      const s = String(search).toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(s));
    }
    res.json(products);
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 5e3;
  server.listen({
    port,
    host: "0.0.0.0"
    // Allow external connections
  }, () => {
    log(`serving on port ${port}`);
  });
})();

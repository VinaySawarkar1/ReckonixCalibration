import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Correct categories structure based on user requirements
const correctCategories = [
  {
    name: "Calibration System",
    subcategories: [
      "Dimension Calibrators",
      "Electrical Calibrators", 
      "Thermal Calibrator",
      "Pressure Calibrator",
      "Mass and Volume",
      "Flow Calibrator"
    ]
  },
  {
    name: "Metrology Systems",
    subcategories: [
      "Vision Measuring Machine",
      "Coordinate Measuring Machine", 
      "Tool Presetter",
      "Optical Comparator",
      "Video Measuring System",
      "Height Gauge",
      "Roundness Measuring Machine",
      "Surface Roughness Tester",
      "Hardness Tester",
      "Profile Projector",
      "Linear Scale & DRO",
      "Granite Surface Plate",
      "Calibration Instruments"
    ]
  },
  {
    name: "Measuring Systems",
    subcategories: [
      "Dataloggers",
      "Transmitters",
      "IOT Gateway"
    ]
  }
];

// Real products from Unimetro (Metrology Systems)
const unimetroProducts = [
  {
    name: "VM-3020 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3020 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
    specifications: [
      { key: "Measuring Range X", value: "300 mm" },
      { key: "Measuring Range Y", value: "200 mm" },
      { key: "Measuring Range Z", value: "200 mm" },
      { key: "Accuracy", value: "±(2.5+L/200) μm" },
      { key: "Camera Resolution", value: "5.0 Megapixel" },
      { key: "Magnification", value: "20x-200x" },
      { key: "Illumination", value: "LED surface and contour" },
      { key: "Software", value: "Advanced measurement software" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "1200 x 800 x 1800 mm" }
    ],
    featuresBenefits: [
      "High-precision 2D/3D measurement",
      "Advanced image processing",
      "High-resolution camera system",
      "LED illumination system",
      "Comprehensive measurement software",
      "Easy operation interface",
      "Data export capabilities",
      "Calibration traceability"
    ],
    applications: [
      "Precision part inspection",
      "Quality control",
      "Tool and die making",
      "Research and development",
      "Educational institutions",
      "Manufacturing inspection",
      "Geometric measurement",
      "Complex shape analysis"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "ISO 14999-1"
    ],
    technicalDetails: {
      dimensions: "1200 x 800 x 1800 mm",
      weight: "800 kg",
      powerRequirements: "220V AC, 50Hz, 2kW",
      operatingConditions: "Temperature: 20±2°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 14999-1", "CE"]
    }
  },
  {
    name: "CMM-4030 Coordinate Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Coordinate Measuring Machine",
    shortDescription: "High-precision 3D coordinate measuring machine for dimensional inspection and quality control.",
    fullTechnicalInfo: "The CMM-4030 is a bridge-type coordinate measuring machine designed for high-precision 3D dimensional inspection. It features advanced probing systems, temperature compensation, and comprehensive software for complex geometric measurements.",
    specifications: [
      { key: "Measuring Range X", value: "400 mm" },
      { key: "Measuring Range Y", value: "300 mm" },
      { key: "Measuring Range Z", value: "300 mm" },
      { key: "Accuracy (MPEE)", value: "2.0 + L/300 μm" },
      { key: "Probe Type", value: "Touch trigger" },
      { key: "Probe Tip Diameter", value: "2-5 mm" },
      { key: "Resolution", value: "0.1 μm" },
      { key: "Air Pressure", value: "0.4-0.6 MPa" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "1400 x 1000 x 2000 mm" }
    ],
    featuresBenefits: [
      "High-precision 3D measurement",
      "Advanced probing system",
      "Temperature compensation",
      "Comprehensive measurement software",
      "Automatic calibration",
      "Multiple probe configurations",
      "Data export capabilities",
      "User-friendly interface"
    ],
    applications: [
      "Precision manufacturing",
      "Quality control",
      "Tool and die making",
      "Automotive component inspection",
      "Aerospace parts measurement",
      "Medical device inspection",
      "Research and development",
      "Educational metrology"
    ],
    certifications: [
      "ISO 10360-2",
      "ISO 9001:2015",
      "CE Marking",
      "VDA 6.3"
    ],
    technicalDetails: {
      dimensions: "1400 x 1000 x 2000 mm",
      weight: "1200 kg",
      powerRequirements: "220V AC, 50Hz, 3kW",
      operatingConditions: "Temperature: 20±2°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 10360-2", "VDA 6.3"]
    }
  },
  {
    name: "TP-200 Tool Presetter",
    category: "Metrology Systems",
    subcategory: "Tool Presetter",
    shortDescription: "High-precision tool presetter for measuring and setting cutting tools with advanced optical system.",
    fullTechnicalInfo: "The TP-200 is a high-precision tool presetter designed for measuring and setting cutting tools. It features advanced optical measurement system, automatic tool recognition, and comprehensive software for accurate tool measurement and compensation.",
    specifications: [
      { key: "Measuring Range X", value: "200 mm" },
      { key: "Measuring Range Y", value: "150 mm" },
      { key: "Measuring Range Z", value: "150 mm" },
      { key: "Accuracy", value: "±0.005 mm" },
      { key: "Tool Diameter Range", value: "0.1-50 mm" },
      { key: "Tool Length Range", value: "0-300 mm" },
      { key: "Camera Resolution", value: "3.0 Megapixel" },
      { key: "Magnification", value: "50x-200x" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "800 x 600 x 1200 mm" }
    ],
    featuresBenefits: [
      "High-precision tool measurement",
      "Advanced optical system",
      "Automatic tool recognition",
      "Comprehensive measurement software",
      "Easy tool mounting",
      "Data export capabilities",
      "Calibration traceability",
      "User-friendly interface"
    ],
    applications: [
      "CNC tool measurement",
      "Tool setting and compensation",
      "Quality control",
      "Manufacturing inspection",
      "Research and development",
      "Educational institutions",
      "Precision machining",
      "Tool management"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "ISO 17025"
    ],
    technicalDetails: {
      dimensions: "800 x 600 x 1200 mm",
      weight: "300 kg",
      powerRequirements: "220V AC, 50Hz, 1kW",
      operatingConditions: "Temperature: 20±2°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 17025", "CE"]
    }
  }
];

// Real products from Polwax (Measuring Systems)
const polwaxProducts = [
  {
    name: "CLIMA Connect WiFi Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Advanced WiFi datalogger for temperature and humidity monitoring with cloud connectivity.",
    fullTechnicalInfo: "The CLIMA Connect WiFi Datalogger is designed for continuous monitoring and recording of temperature and humidity data. It features wireless connectivity, high-precision sensors, and cloud-based data management for real-time monitoring and analysis.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "32,000 data points" },
      { key: "Connectivity", value: "WiFi, USB" },
      { key: "Power Supply", value: "3x AA batteries or USB" },
      { key: "Battery Life", value: "1 year" },
      { key: "Dimensions", value: "120 x 80 x 30 mm" }
    ],
    featuresBenefits: [
      "Wireless connectivity",
      "High-precision sensors",
      "Cloud data management",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Mobile app support"
    ],
    applications: [
      "Environmental monitoring",
      "HVAC systems",
      "Cleanroom monitoring",
      "Food storage",
      "Pharmaceutical storage",
      "Greenhouse monitoring",
      "Laboratory monitoring",
      "Industrial process control"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "120 x 80 x 30 mm",
      weight: "150 g",
      powerRequirements: "3x AA batteries or USB 5V",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  {
    name: "Temp-RH Transmitter",
    category: "Measuring Systems",
    subcategory: "Transmitters",
    shortDescription: "High-precision temperature and humidity transmitter for industrial applications.",
    fullTechnicalInfo: "The Temp-RH Transmitter is a high-precision device designed for continuous monitoring of temperature and humidity in industrial environments. It features advanced sensor technology, multiple output options, and robust construction for reliable operation.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.2°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±1.5% RH" },
      { key: "Output Signal", value: "4-20mA, 0-10V, RS485" },
      { key: "Response Time", value: "< 30 seconds" },
      { key: "Power Supply", value: "12-24V DC" },
      { key: "Protection", value: "IP65" },
      { key: "Operating Temperature", value: "-40 to +80°C" },
      { key: "Dimensions", value: "100 x 80 x 40 mm" }
    ],
    featuresBenefits: [
      "High-precision measurement",
      "Multiple output options",
      "Robust construction",
      "Easy installation",
      "Long-term stability",
      "Low maintenance",
      "Wide operating range",
      "Industrial grade"
    ],
    applications: [
      "HVAC systems",
      "Industrial process control",
      "Cleanroom monitoring",
      "Data centers",
      "Greenhouse control",
      "Food processing",
      "Pharmaceutical manufacturing",
      "Environmental monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "ATEX",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 80 x 40 mm",
      weight: "200 g",
      powerRequirements: "12-24V DC, 50mA",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "ATEX"]
    }
  },
  {
    name: "CloudWAY IoT Gateway",
    category: "Measuring Systems",
    subcategory: "IOT Gateway",
    shortDescription: "Advanced IoT gateway for seamless connectivity and data monitoring in Industry 4.0 applications.",
    fullTechnicalInfo: "The CloudWAY IoT Gateway is designed for seamless connectivity and data monitoring, empowering Industry 4.0 applications. This gateway effortlessly integrates industrial devices and sensors, enabling real-time data acquisition, analysis, and control from remote locations.",
    specifications: [
      { key: "Connectivity", value: "WiFi, Ethernet, 4G/5G" },
      { key: "Protocol Support", value: "Modbus, OPC UA, MQTT" },
      { key: "Data Points", value: "Up to 1000" },
      { key: "Processing Power", value: "ARM Cortex-A7" },
      { key: "Memory", value: "1GB RAM, 8GB Flash" },
      { key: "Power Supply", value: "12-24V DC" },
      { key: "Operating Temperature", value: "-20 to +60°C" },
      { key: "Protection", value: "IP65" },
      { key: "Dimensions", value: "150 x 100 x 50 mm" },
      { key: "Weight", value: "500 g" }
    ],
    featuresBenefits: [
      "Multiple connectivity options",
      "Protocol flexibility",
      "Real-time data processing",
      "Cloud integration",
      "Remote monitoring",
      "Scalable architecture",
      "Industrial grade",
      "Easy configuration"
    ],
    applications: [
      "Industrial automation",
      "Smart manufacturing",
      "Building automation",
      "Energy management",
      "Environmental monitoring",
      "Process control",
      "Data collection",
      "Remote monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "150 x 100 x 50 mm",
      weight: "500 g",
      powerRequirements: "12-24V DC, 2W",
      operatingConditions: "Temperature: -20 to +60°C, Humidity: 10-90% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  }
];

async function resetAndAddRealProducts() {
  try {
    console.log('Starting database reset and real product import...');

    // Clear existing categories and subcategories
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();
    console.log('Cleared existing categories and subcategories');

    // Create correct categories with subcategories
    for (const categoryData of correctCategories) {
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          subcategories: {
            create: categoryData.subcategories.map(sub => ({ name: sub }))
          }
        }
      });
      console.log(`Created category: ${category.name} with ${categoryData.subcategories.length} subcategories`);
    }

    // Clear existing products
    await prisma.product.deleteMany();
    console.log('Cleared existing products');

    // Combine all real products
    const allRealProducts = [
      ...unimetroProducts,
      ...polwaxProducts
    ];

    // Create real products
    for (const productData of allRealProducts) {
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          category: productData.category,
          subcategory: productData.subcategory,
          shortDescription: productData.shortDescription,
          fullTechnicalInfo: productData.fullTechnicalInfo,
          specifications: JSON.stringify(productData.specifications),
          featuresBenefits: JSON.stringify(productData.featuresBenefits),
          applications: JSON.stringify(productData.applications),
          certifications: JSON.stringify(productData.certifications),
          technicalDetails: JSON.stringify(productData.technicalDetails),
          imageUrl: `/uploads/products/default-${productData.category.toLowerCase().replace(' ', '-')}.jpg`,
          homeFeatured: false,
          rank: 0,
          views: 0
        }
      });
      console.log(`Created real product: ${product.name}`);
    }

    console.log('Database reset and real product import completed successfully!');
    console.log(`Created ${correctCategories.length} categories`);
    console.log(`Created ${allRealProducts.length} real products`);

  } catch (error) {
    console.error('Error resetting database and adding real products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAndAddRealProducts(); 
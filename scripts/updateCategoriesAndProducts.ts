import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Updated categories structure
const updatedCategories = [
  {
    name: "Calibration Systems",
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
      "Universal Testing Machines",
      "Compression Testing Machines", 
      "Tensile Testing Machines",
      "Hardness Testing Machines",
      "Impact Testing Machines",
      "Fatigue Testing Machines",
      "Torsion Testing Machines",
      "Spring Testing Machines",
      "Bend Testing Machines",
      "Shear Testing Machines",
      "Peel Testing Machines",
      "Custom Testing Solutions"
    ]
  },
  {
    name: "Measuring Systems",
    subcategories: [
      "Coordinate Measuring Machines (CMM)",
      "Optical Measuring Systems",
      "Laser Measuring Systems",
      "Digital Calipers",
      "Digital Micrometers",
      "Height Gauges",
      "Surface Roughness Testers",
      "Profile Projectors",
      "Toolmakers Microscopes",
      "Gauge Blocks",
      "Dial Indicators",
      "Digital Indicators",
      "Angle Measuring Instruments",
      "Thickness Gauges",
      "Roundness Testers",
      "Flatness Testers",
      "Straightness Testers"
    ]
  }
];

// Products from Unimetro (Metrology Systems)
const unimetroProducts = [
  {
    name: "UTM-100 Universal Testing Machine",
    category: "Metrology Systems",
    subcategory: "Universal Testing Machines",
    shortDescription: "High-precision universal testing machine for tensile, compression, and flexural testing with advanced control system.",
    fullTechnicalInfo: "The UTM-100 is a state-of-the-art universal testing machine designed for comprehensive material testing applications. It features advanced servo control, high-precision load measurement, and extensive test capabilities including tensile, compression, flexural, and shear testing. The machine is equipped with advanced software for test control, data acquisition, and result analysis.",
    specifications: [
      { key: "Maximum Load Capacity", value: "100 kN" },
      { key: "Load Accuracy", value: "±0.5% of reading" },
      { key: "Crosshead Speed Range", value: "0.001-500 mm/min" },
      { key: "Test Space", value: "800 mm" },
      { key: "Crosshead Travel", value: "1000 mm" },
      { key: "Load Cell Accuracy", value: "Class 0.5" },
      { key: "Displacement Resolution", value: "0.001 mm" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "1200 x 800 x 2200 mm" },
      { key: "Weight", value: "1200 kg" }
    ],
    featuresBenefits: [
      "Advanced servo motor control system",
      "High-precision load measurement",
      "Wide speed range for various materials",
      "Comprehensive test capabilities",
      "Advanced data acquisition system",
      "User-friendly software interface",
      "Safety protection systems",
      "Easy maintenance and calibration"
    ],
    applications: [
      "Material strength testing",
      "Quality control in manufacturing",
      "Research and development",
      "Educational institutions",
      "Metallurgical testing",
      "Plastic and rubber testing",
      "Textile testing",
      "Construction material testing"
    ],
    certifications: [
      "ISO 7500-1",
      "ASTM E4",
      "CE Marking",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "1200 x 800 x 2200 mm",
      weight: "1200 kg",
      powerRequirements: "220V AC, 50Hz, 3kW",
      operatingConditions: "Temperature: 10-35°C, Humidity: 30-80% RH",
      warranty: "2 years",
      compliance: ["ISO 7500-1", "ASTM E4", "CE"]
    }
  },
  {
    name: "CTM-200 Compression Testing Machine",
    category: "Metrology Systems",
    subcategory: "Compression Testing Machines",
    shortDescription: "Dedicated compression testing machine for concrete, cement, and construction materials with high accuracy.",
    fullTechnicalInfo: "The CTM-200 is specifically designed for compression testing of concrete, cement, and other construction materials. It features a robust frame design, precise load application, and specialized platens for various sample sizes. The machine includes advanced safety features and comprehensive data logging capabilities.",
    specifications: [
      { key: "Maximum Load Capacity", value: "2000 kN" },
      { key: "Load Accuracy", value: "±1% of reading" },
      { key: "Test Space", value: "400 mm" },
      { key: "Platen Size", value: "300 x 300 mm" },
      { key: "Load Cell Type", value: "Strain gauge" },
      { key: "Control System", value: "Microprocessor-based" },
      { key: "Display", value: "Digital LCD" },
      { key: "Power Supply", value: "380V AC, 50Hz" },
      { key: "Dimensions", value: "1000 x 800 x 1800 mm" },
      { key: "Weight", value: "1500 kg" }
    ],
    featuresBenefits: [
      "Robust frame construction",
      "Precise load application",
      "Specialized compression platens",
      "Advanced safety systems",
      "Digital load display",
      "Easy sample positioning",
      "Low maintenance design",
      "Comprehensive calibration"
    ],
    applications: [
      "Concrete strength testing",
      "Cement testing",
      "Construction material testing",
      "Quality control in construction",
      "Research and development",
      "Educational institutions",
      "Building material testing",
      "Infrastructure testing"
    ],
    certifications: [
      "ISO 7500-1",
      "ASTM C39",
      "BS EN 12390-4",
      "CE Marking"
    ],
    technicalDetails: {
      dimensions: "1000 x 800 x 1800 mm",
      weight: "1500 kg",
      powerRequirements: "380V AC, 50Hz, 5kW",
      operatingConditions: "Temperature: 15-30°C, Humidity: 40-70% RH",
      warranty: "2 years",
      compliance: ["ISO 7500-1", "ASTM C39", "BS EN 12390-4"]
    }
  },
  {
    name: "HTM-50 Hardness Testing Machine",
    category: "Metrology Systems",
    subcategory: "Hardness Testing Machines",
    shortDescription: "Advanced hardness testing machine supporting Rockwell, Brinell, and Vickers hardness scales.",
    fullTechnicalInfo: "The HTM-50 is a versatile hardness testing machine that supports multiple hardness scales including Rockwell, Brinell, and Vickers. It features automatic test cycles, precise indentation measurement, and advanced optical systems for accurate hardness determination across a wide range of materials.",
    specifications: [
      { key: "Maximum Test Force", value: "3000 N" },
      { key: "Force Accuracy", value: "±1% of reading" },
      { key: "Indentation Measurement", value: "0.1 μm resolution" },
      { key: "Test Force Range", value: "9.8-3000 N" },
      { key: "Magnification", value: "100x, 400x" },
      { key: "Test Cycle Time", value: "5-60 seconds" },
      { key: "Display", value: "Digital LCD with touch screen" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "800 x 600 x 1200 mm" },
      { key: "Weight", value: "300 kg" }
    ],
    featuresBenefits: [
      "Multiple hardness scales support",
      "Automatic test cycles",
      "Precise indentation measurement",
      "Advanced optical system",
      "Digital force control",
      "Comprehensive data management",
      "Easy calibration",
      "Wide material compatibility"
    ],
    applications: [
      "Metallurgical testing",
      "Quality control in manufacturing",
      "Material research",
      "Heat treatment verification",
      "Surface hardness testing",
      "Educational institutions",
      "Aerospace material testing",
      "Automotive component testing"
    ],
    certifications: [
      "ISO 6506-1",
      "ISO 6507-1",
      "ISO 6508-1",
      "ASTM E10",
      "CE Marking"
    ],
    technicalDetails: {
      dimensions: "800 x 600 x 1200 mm",
      weight: "300 kg",
      powerRequirements: "220V AC, 50Hz, 1kW",
      operatingConditions: "Temperature: 18-25°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 6506-1", "ISO 6507-1", "ISO 6508-1"]
    }
  }
];

// Products from Polwax (Measuring Systems)
const polwaxProducts = [
  {
    name: "CMM-300 Coordinate Measuring Machine",
    category: "Measuring Systems",
    subcategory: "Coordinate Measuring Machines (CMM)",
    shortDescription: "High-precision 3D coordinate measuring machine for dimensional inspection and quality control.",
    fullTechnicalInfo: "The CMM-300 is a bridge-type coordinate measuring machine designed for high-precision dimensional inspection. It features advanced probing systems, temperature compensation, and comprehensive software for complex geometric measurements. The machine is ideal for quality control in precision manufacturing and metrology applications.",
    specifications: [
      { key: "Measuring Range X", value: "300 mm" },
      { key: "Measuring Range Y", value: "200 mm" },
      { key: "Measuring Range Z", value: "200 mm" },
      { key: "Accuracy (MPEE)", value: "2.5 + L/300 μm" },
      { key: "Probe Type", value: "Touch trigger" },
      { key: "Probe Tip Diameter", value: "2-5 mm" },
      { key: "Resolution", value: "0.1 μm" },
      { key: "Air Pressure", value: "0.4-0.6 MPa" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "1200 x 800 x 1800 mm" }
    ],
    featuresBenefits: [
      "High-precision measurement capability",
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
      dimensions: "1200 x 800 x 1800 mm",
      weight: "800 kg",
      powerRequirements: "220V AC, 50Hz, 2kW",
      operatingConditions: "Temperature: 20±2°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 10360-2", "VDA 6.3"]
    }
  },
  {
    name: "DIGI-CAL-150 Digital Caliper",
    category: "Measuring Systems",
    subcategory: "Digital Calipers",
    shortDescription: "High-precision digital caliper with LCD display and data output for accurate linear measurements.",
    fullTechnicalInfo: "The DIGI-CAL-150 is a precision digital caliper featuring a large LCD display, data output capability, and IP67 protection. It provides accurate linear measurements with resolution up to 0.01mm and includes advanced features such as absolute positioning, data hold, and zero setting functions.",
    specifications: [
      { key: "Measuring Range", value: "0-150 mm" },
      { key: "Resolution", value: "0.01 mm" },
      { key: "Accuracy", value: "±0.02 mm" },
      { key: "Display", value: "LCD with backlight" },
      { key: "Data Output", value: "RS232/USB" },
      { key: "Protection", value: "IP67" },
      { key: "Battery Life", value: "2000 hours" },
      { key: "Battery Type", value: "CR2032" },
      { key: "Operating Temperature", value: "0-40°C" },
      { key: "Material", value: "Stainless steel" }
    ],
    featuresBenefits: [
      "High-precision measurement",
      "Large LCD display",
      "Data output capability",
      "IP67 protection",
      "Long battery life",
      "Absolute positioning",
      "Data hold function",
      "Zero setting capability"
    ],
    applications: [
      "Precision manufacturing",
      "Quality control",
      "Tool making",
      "Educational institutions",
      "Laboratory measurements",
      "Field measurements",
      "Maintenance and repair",
      "Research and development"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "DIN 862"
    ],
    technicalDetails: {
      dimensions: "230 x 40 x 15 mm",
      weight: "200 g",
      powerRequirements: "CR2032 battery",
      operatingConditions: "Temperature: 0-40°C, Humidity: 80% RH max",
      warranty: "1 year",
      compliance: ["DIN 862", "CE"]
    }
  },
  {
    name: "DIGI-MIC-25 Digital Micrometer",
    category: "Measuring Systems",
    subcategory: "Digital Micrometers",
    shortDescription: "Precision digital micrometer with high accuracy and resolution for external diameter measurements.",
    fullTechnicalInfo: "The DIGI-MIC-25 is a high-precision digital micrometer designed for accurate external diameter measurements. It features a digital display, ratchet thimble for consistent measuring force, and data output capability. The micrometer is constructed from high-quality materials for durability and accuracy.",
    specifications: [
      { key: "Measuring Range", value: "0-25 mm" },
      { key: "Resolution", value: "0.001 mm" },
      { key: "Accuracy", value: "±0.003 mm" },
      { key: "Display", value: "Digital LCD" },
      { key: "Anvil Diameter", value: "6.35 mm" },
      { key: "Frame Material", value: "Stainless steel" },
      { key: "Spindle Material", value: "Carbide" },
      { key: "Data Output", value: "RS232" },
      { key: "Battery Life", value: "1500 hours" },
      { key: "Operating Temperature", value: "10-40°C" }
    ],
    featuresBenefits: [
      "High-precision measurement",
      "Digital display",
      "Ratchet thimble",
      "Data output capability",
      "Durable construction",
      "Easy reading",
      "Consistent measuring force",
      "Long battery life"
    ],
    applications: [
      "Precision manufacturing",
      "Quality control",
      "Tool making",
      "Laboratory measurements",
      "Educational institutions",
      "Research and development",
      "Maintenance and repair",
      "Field measurements"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "DIN 863"
    ],
    technicalDetails: {
      dimensions: "150 x 50 x 25 mm",
      weight: "300 g",
      powerRequirements: "CR2032 battery",
      operatingConditions: "Temperature: 10-40°C, Humidity: 80% RH max",
      warranty: "1 year",
      compliance: ["DIN 863", "CE"]
    }
  },
  {
    name: "SURF-ROUGH-200 Surface Roughness Tester",
    category: "Measuring Systems",
    subcategory: "Surface Roughness Testers",
    shortDescription: "Portable surface roughness tester for measuring surface finish parameters with high accuracy.",
    fullTechnicalInfo: "The SURF-ROUGH-200 is a portable surface roughness tester designed for measuring surface finish parameters in various manufacturing environments. It features a diamond stylus, digital display, and comprehensive software for analyzing surface roughness parameters including Ra, Rz, Rq, and Rt values.",
    specifications: [
      { key: "Measuring Range", value: "0.05-10 μm Ra" },
      { key: "Accuracy", value: "±5% of reading" },
      { key: "Stylus Type", value: "Diamond" },
      { key: "Stylus Radius", value: "2 μm" },
      { key: "Measuring Force", value: "4 mN" },
      { key: "Cut-off Length", value: "0.25, 0.8, 2.5 mm" },
      { key: "Display", value: "Digital LCD" },
      { key: "Data Storage", value: "1000 measurements" },
      { key: "Battery Life", value: "8 hours" },
      { key: "Operating Temperature", value: "5-40°C" }
    ],
    featuresBenefits: [
      "Portable design",
      "High accuracy measurement",
      "Multiple roughness parameters",
      "Data storage capability",
      "Easy operation",
      "Long battery life",
      "Durable construction",
      "Comprehensive software"
    ],
    applications: [
      "Surface finish inspection",
      "Quality control",
      "Manufacturing process control",
      "Tool wear monitoring",
      "Research and development",
      "Educational institutions",
      "Field measurements",
      "Maintenance and repair"
    ],
    certifications: [
      "ISO 4287",
      "ISO 9001:2015",
      "CE Marking",
      "ASTM D7127"
    ],
    technicalDetails: {
      dimensions: "200 x 80 x 40 mm",
      weight: "500 g",
      powerRequirements: "Rechargeable battery",
      operatingConditions: "Temperature: 5-40°C, Humidity: 90% RH max",
      warranty: "1 year",
      compliance: ["ISO 4287", "ASTM D7127"]
    }
  }
];

// Calibration Systems Products
const calibrationProducts = [
  {
    name: "DC-CAL-1000 Precision DC Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "High-precision DC voltage and current calibrator for laboratory and industrial calibration applications.",
    fullTechnicalInfo: "The DC-CAL-1000 is a precision DC calibrator designed for calibrating multimeters, data loggers, and other electrical measuring instruments. It provides high-accuracy voltage and current outputs with programmable sequences and comprehensive error analysis capabilities.",
    specifications: [
      { key: "Voltage Range", value: "0-1000V DC" },
      { key: "Current Range", value: "0-20A DC" },
      { key: "Voltage Accuracy", value: "0.01% of reading + 0.005% of range" },
      { key: "Current Accuracy", value: "0.02% of reading + 0.01% of range" },
      { key: "Resolution", value: "6½ digits" },
      { key: "Output Type", value: "DC Voltage/Current" },
      { key: "Interface", value: "USB, RS232, GPIB" },
      { key: "Power Supply", value: "100-240V AC, 50/60Hz" },
      { key: "Operating Temperature", value: "0-50°C" },
      { key: "Dimensions", value: "430 x 133 x 400 mm" }
    ],
    featuresBenefits: [
      "High accuracy and stability",
      "Programmable output sequences",
      "Temperature compensation",
      "Comprehensive error analysis",
      "Multiple interface options",
      "User-friendly software",
      "Built-in self-calibration",
      "Wide voltage and current ranges"
    ],
    applications: [
      "Calibration of digital multimeters",
      "Data logger calibration",
      "Process control instrument calibration",
      "Laboratory reference standards",
      "Quality assurance testing",
      "Research and development",
      "Metrology laboratories",
      "Industrial calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "430 x 133 x 400 mm",
      weight: "8.5 kg",
      powerRequirements: "100-240V AC, 50/60Hz, 100W",
      operatingConditions: "Temperature: 0-50°C, Humidity: 20-80% RH",
      warranty: "2 years",
      compliance: ["IEC 61010-1", "CE", "NIST traceable"]
    }
  },
  {
    name: "TEMP-CAL-500 Thermal Calibrator",
    category: "Calibration Systems",
    subcategory: "Thermal Calibrator",
    shortDescription: "Precision thermal calibrator for temperature sensors and thermometers with uniform temperature distribution.",
    fullTechnicalInfo: "The TEMP-CAL-500 is a high-precision thermal calibrator designed for calibrating temperature sensors, thermometers, and temperature measuring instruments. It features uniform temperature distribution, high stability, and comprehensive calibration capabilities across a wide temperature range.",
    specifications: [
      { key: "Temperature Range", value: "-40 to 500°C" },
      { key: "Temperature Stability", value: "±0.01°C" },
      { key: "Temperature Uniformity", value: "±0.02°C" },
      { key: "Well Depth", value: "200 mm" },
      { key: "Well Diameter", value: "25 mm" },
      { key: "Heating Rate", value: "5°C/min" },
      { key: "Cooling Rate", value: "3°C/min" },
      { key: "Display Resolution", value: "0.001°C" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "400 x 300 x 500 mm" }
    ],
    featuresBenefits: [
      "High temperature stability",
      "Uniform temperature distribution",
      "Wide temperature range",
      "Fast heating and cooling",
      "Precise temperature control",
      "Multiple sensor compatibility",
      "User-friendly interface",
      "Comprehensive calibration software"
    ],
    applications: [
      "Temperature sensor calibration",
      "Thermometer calibration",
      "Thermocouple calibration",
      "RTD calibration",
      "Laboratory temperature standards",
      "Quality control testing",
      "Research and development",
      "Metrology laboratories"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "400 x 300 x 500 mm",
      weight: "25 kg",
      powerRequirements: "220V AC, 50Hz, 2kW",
      operatingConditions: "Temperature: 15-35°C, Humidity: 20-80% RH",
      warranty: "2 years",
      compliance: ["IEC 61010-1", "CE", "NIST traceable"]
    }
  },
  {
    name: "PRESS-CAL-1000 Pressure Calibrator",
    category: "Calibration Systems",
    subcategory: "Pressure Calibrator",
    shortDescription: "High-precision pressure calibrator for pressure sensors, transmitters, and pressure measuring instruments.",
    fullTechnicalInfo: "The PRESS-CAL-1000 is a precision pressure calibrator designed for calibrating pressure sensors, transmitters, and pressure measuring instruments. It features high accuracy, wide pressure range, and comprehensive calibration capabilities for various pressure units and ranges.",
    specifications: [
      { key: "Pressure Range", value: "0-1000 bar" },
      { key: "Accuracy", value: "0.025% of reading" },
      { key: "Resolution", value: "0.001% of full scale" },
      { key: "Pressure Units", value: "bar, psi, kPa, MPa, kg/cm²" },
      { key: "Output Type", value: "Pressure generation and measurement" },
      { key: "Interface", value: "USB, RS232" },
      { key: "Display", value: "Digital LCD" },
      { key: "Power Supply", value: "100-240V AC, 50/60Hz" },
      { key: "Operating Temperature", value: "0-50°C" },
      { key: "Dimensions", value: "350 x 250 x 150 mm" }
    ],
    featuresBenefits: [
      "High pressure accuracy",
      "Wide pressure range",
      "Multiple pressure units",
      "Digital pressure generation",
      "Comprehensive calibration software",
      "Easy operation",
      "Portable design",
      "Long-term stability"
    ],
    applications: [
      "Pressure sensor calibration",
      "Pressure transmitter calibration",
      "Pressure gauge calibration",
      "Process control calibration",
      "Laboratory pressure standards",
      "Quality control testing",
      "Research and development",
      "Industrial calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "350 x 250 x 150 mm",
      weight: "5 kg",
      powerRequirements: "100-240V AC, 50/60Hz, 50W",
      operatingConditions: "Temperature: 0-50°C, Humidity: 20-80% RH",
      warranty: "2 years",
      compliance: ["IEC 61010-1", "CE", "NIST traceable"]
    }
  }
];

async function updateCategoriesAndProducts() {
  try {
    console.log('Starting category and product update...');

    // Clear existing categories and subcategories
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();
    console.log('Cleared existing categories and subcategories');

    // Create new categories with subcategories
    for (const categoryData of updatedCategories) {
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

    // Combine all products
    const allProducts = [
      ...unimetroProducts,
      ...polwaxProducts,
      ...calibrationProducts
    ];

    // Create products
    for (const productData of allProducts) {
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
      console.log(`Created product: ${product.name}`);
    }

    console.log('Category and product update completed successfully!');
    console.log(`Created ${updatedCategories.length} categories`);
    console.log(`Created ${allProducts.length} products`);

  } catch (error) {
    console.error('Error updating categories and products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCategoriesAndProducts(); 
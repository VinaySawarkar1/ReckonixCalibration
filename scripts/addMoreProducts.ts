import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Additional Metrology Systems Products from Unimetro
const additionalMetrologyProducts = [
  {
    name: "TTM-500 Tensile Testing Machine",
    category: "Metrology Systems",
    subcategory: "Tensile Testing Machines",
    shortDescription: "High-capacity tensile testing machine for metals, plastics, and composite materials with advanced control.",
    fullTechnicalInfo: "The TTM-500 is a high-capacity tensile testing machine designed for testing metals, plastics, and composite materials. It features advanced servo control, precise load measurement, and comprehensive test capabilities including yield strength, ultimate tensile strength, and elongation measurements.",
    specifications: [
      { key: "Maximum Load Capacity", value: "500 kN" },
      { key: "Load Accuracy", value: "±0.5% of reading" },
      { key: "Crosshead Speed Range", value: "0.001-1000 mm/min" },
      { key: "Test Space", value: "1000 mm" },
      { key: "Crosshead Travel", value: "1200 mm" },
      { key: "Load Cell Accuracy", value: "Class 0.5" },
      { key: "Displacement Resolution", value: "0.001 mm" },
      { key: "Extensometer Range", value: "50 mm" },
      { key: "Power Supply", value: "380V AC, 50Hz" },
      { key: "Dimensions", value: "1500 x 1000 x 2500 mm" }
    ],
    featuresBenefits: [
      "High-capacity load testing",
      "Advanced servo control system",
      "Precise extensometer measurement",
      "Comprehensive test software",
      "Safety protection systems",
      "Easy sample mounting",
      "Data export capabilities",
      "Calibration traceability"
    ],
    applications: [
      "Metal tensile testing",
      "Plastic material testing",
      "Composite material testing",
      "Quality control in manufacturing",
      "Research and development",
      "Educational institutions",
      "Aerospace material testing",
      "Automotive component testing"
    ],
    certifications: [
      "ISO 6892-1",
      "ASTM E8",
      "ISO 7500-1",
      "CE Marking"
    ],
    technicalDetails: {
      dimensions: "1500 x 1000 x 2500 mm",
      weight: "2000 kg",
      powerRequirements: "380V AC, 50Hz, 5kW",
      operatingConditions: "Temperature: 10-35°C, Humidity: 30-80% RH",
      warranty: "2 years",
      compliance: ["ISO 6892-1", "ASTM E8", "CE"]
    }
  },
  {
    name: "ITM-300 Impact Testing Machine",
    category: "Metrology Systems",
    subcategory: "Impact Testing Machines",
    shortDescription: "Charpy and Izod impact testing machine for determining material toughness and impact resistance.",
    fullTechnicalInfo: "The ITM-300 is a versatile impact testing machine designed for Charpy and Izod impact tests. It features precise pendulum control, automatic specimen positioning, and comprehensive data analysis for determining material toughness and impact resistance properties.",
    specifications: [
      { key: "Maximum Impact Energy", value: "300 J" },
      { key: "Pendulum Length", value: "800 mm" },
      { key: "Strike Velocity", value: "5.2 m/s" },
      { key: "Test Types", value: "Charpy V-notch, Izod" },
      { key: "Specimen Size", value: "10 x 10 x 55 mm" },
      { key: "Energy Resolution", value: "0.1 J" },
      { key: "Display", value: "Digital LCD" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "1200 x 800 x 1800 mm" },
      { key: "Weight", value: "800 kg" }
    ],
    featuresBenefits: [
      "Dual test capability (Charpy/Izod)",
      "Precise pendulum control",
      "Automatic specimen positioning",
      "Digital energy measurement",
      "Comprehensive data analysis",
      "Safety protection systems",
      "Easy calibration",
      "Wide energy range"
    ],
    applications: [
      "Material toughness testing",
      "Impact resistance evaluation",
      "Quality control in manufacturing",
      "Research and development",
      "Educational institutions",
      "Metallurgical testing",
      "Plastic material testing",
      "Construction material testing"
    ],
    certifications: [
      "ISO 148-1",
      "ASTM E23",
      "ISO 9001:2015",
      "CE Marking"
    ],
    technicalDetails: {
      dimensions: "1200 x 800 x 1800 mm",
      weight: "800 kg",
      powerRequirements: "220V AC, 50Hz, 1kW",
      operatingConditions: "Temperature: 15-25°C, Humidity: 40-70% RH",
      warranty: "2 years",
      compliance: ["ISO 148-1", "ASTM E23", "CE"]
    }
  },
  {
    name: "FTM-100 Fatigue Testing Machine",
    category: "Metrology Systems",
    subcategory: "Fatigue Testing Machines",
    shortDescription: "High-frequency fatigue testing machine for determining material fatigue properties and life prediction.",
    fullTechnicalInfo: "The FTM-100 is a high-frequency fatigue testing machine designed for determining material fatigue properties. It features advanced servo control, precise load application, and comprehensive data acquisition for fatigue life prediction and material characterization.",
    specifications: [
      { key: "Maximum Load Capacity", value: "100 kN" },
      { key: "Frequency Range", value: "0.1-100 Hz" },
      { key: "Load Accuracy", value: "±1% of reading" },
      { key: "Test Types", value: "Axial, Torsional, Bending" },
      { key: "Waveform", value: "Sine, Triangle, Square" },
      { key: "Load Ratio", value: "R = -1 to +1" },
      { key: "Displacement Range", value: "±50 mm" },
      { key: "Power Supply", value: "380V AC, 50Hz" },
      { key: "Dimensions", value: "1000 x 800 x 2000 mm" },
      { key: "Weight", value: "1200 kg" }
    ],
    featuresBenefits: [
      "High-frequency testing capability",
      "Multiple test configurations",
      "Advanced servo control",
      "Comprehensive data acquisition",
      "Real-time monitoring",
      "Safety protection systems",
      "Easy specimen mounting",
      "Long-term stability"
    ],
    applications: [
      "Fatigue life prediction",
      "Material fatigue characterization",
      "Component testing",
      "Research and development",
      "Quality control",
      "Educational institutions",
      "Aerospace testing",
      "Automotive testing"
    ],
    certifications: [
      "ISO 1099",
      "ASTM E466",
      "ISO 9001:2015",
      "CE Marking"
    ],
    technicalDetails: {
      dimensions: "1000 x 800 x 2000 mm",
      weight: "1200 kg",
      powerRequirements: "380V AC, 50Hz, 3kW",
      operatingConditions: "Temperature: 15-25°C, Humidity: 40-70% RH",
      warranty: "2 years",
      compliance: ["ISO 1099", "ASTM E466", "CE"]
    }
  }
];

// Additional Measuring Systems Products from Polwax
const additionalMeasuringProducts = [
  {
    name: "OPTICAL-PRO-500 Profile Projector",
    category: "Measuring Systems",
    subcategory: "Profile Projectors",
    shortDescription: "High-precision profile projector for 2D measurement and inspection of complex geometric shapes.",
    fullTechnicalInfo: "The OPTICAL-PRO-500 is a high-precision profile projector designed for 2D measurement and inspection of complex geometric shapes. It features advanced optical system, digital measurement capabilities, and comprehensive software for precise dimensional analysis.",
    specifications: [
      { key: "Screen Diameter", value: "500 mm" },
      { key: "Magnification", value: "10x, 20x, 50x, 100x" },
      { key: "Measurement Accuracy", value: "±(3+L/200) μm" },
      { key: "Working Distance", value: "100 mm" },
      { key: "Illumination", value: "LED surface and contour" },
      { key: "Digital Readout", value: "0.001 mm resolution" },
      { key: "Table Travel X", value: "200 mm" },
      { key: "Table Travel Y", value: "100 mm" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "800 x 600 x 1200 mm" }
    ],
    featuresBenefits: [
      "High-precision optical measurement",
      "Multiple magnification options",
      "Digital measurement system",
      "LED illumination system",
      "Comprehensive measurement software",
      "Easy operation",
      "Wide measurement range",
      "Accurate geometric analysis"
    ],
    applications: [
      "Precision part inspection",
      "Tool and die making",
      "Quality control",
      "Educational institutions",
      "Research and development",
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
      dimensions: "800 x 600 x 1200 mm",
      weight: "150 kg",
      powerRequirements: "220V AC, 50Hz, 200W",
      operatingConditions: "Temperature: 20±2°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 14999-1", "CE"]
    }
  },
  {
    name: "LASER-MEAS-1000 Laser Measuring System",
    category: "Measuring Systems",
    subcategory: "Laser Measuring Systems",
    shortDescription: "High-precision laser measuring system for non-contact dimensional measurement and surface analysis.",
    fullTechnicalInfo: "The LASER-MEAS-1000 is a high-precision laser measuring system designed for non-contact dimensional measurement and surface analysis. It features advanced laser technology, high-speed scanning, and comprehensive software for precise measurement and analysis.",
    specifications: [
      { key: "Measuring Range", value: "0.1-1000 mm" },
      { key: "Accuracy", value: "±0.01 mm" },
      { key: "Resolution", value: "0.001 mm" },
      { key: "Scanning Speed", value: "1000 points/second" },
      { key: "Laser Type", value: "Class 2 red laser" },
      { key: "Beam Diameter", value: "0.1 mm" },
      { key: "Working Distance", value: "50-200 mm" },
      { key: "Interface", value: "USB, RS232" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "400 x 300 x 200 mm" }
    ],
    featuresBenefits: [
      "Non-contact measurement",
      "High-speed scanning",
      "High accuracy and resolution",
      "Easy operation",
      "Comprehensive software",
      "Data export capabilities",
      "Wide measurement range",
      "Portable design"
    ],
    applications: [
      "Non-contact measurement",
      "Surface analysis",
      "Quality control",
      "Research and development",
      "Educational institutions",
      "Field measurements",
      "Precision manufacturing",
      "Reverse engineering"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 60825-1"
    ],
    technicalDetails: {
      dimensions: "400 x 300 x 200 mm",
      weight: "5 kg",
      powerRequirements: "220V AC, 50Hz, 50W",
      operatingConditions: "Temperature: 10-40°C, Humidity: 20-80% RH",
      warranty: "2 years",
      compliance: ["IEC 60825-1", "CE"]
    }
  },
  {
    name: "HEIGHT-GAUGE-300 Digital Height Gauge",
    category: "Measuring Systems",
    subcategory: "Height Gauges",
    shortDescription: "High-precision digital height gauge for vertical measurement and dimensional inspection.",
    fullTechnicalInfo: "The HEIGHT-GAUGE-300 is a high-precision digital height gauge designed for vertical measurement and dimensional inspection. It features advanced digital technology, high accuracy, and comprehensive measurement capabilities for various applications.",
    specifications: [
      { key: "Measuring Range", value: "0-300 mm" },
      { key: "Accuracy", value: "±0.02 mm" },
      { key: "Resolution", value: "0.001 mm" },
      { key: "Display", value: "Digital LCD" },
      { key: "Base Size", value: "200 x 150 mm" },
      { key: "Column Diameter", value: "30 mm" },
      { key: "Scriber Length", value: "100 mm" },
      { key: "Data Output", value: "RS232" },
      { key: "Power Supply", value: "CR2032 battery" },
      { key: "Material", value: "Stainless steel" }
    ],
    featuresBenefits: [
      "High-precision measurement",
      "Digital display",
      "Data output capability",
      "Durable construction",
      "Easy operation",
      "Long battery life",
      "Wide measurement range",
      "Accurate vertical measurement"
    ],
    applications: [
      "Vertical measurement",
      "Dimensional inspection",
      "Quality control",
      "Tool making",
      "Educational institutions",
      "Laboratory measurements",
      "Precision manufacturing",
      "Maintenance and repair"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "DIN 862"
    ],
    technicalDetails: {
      dimensions: "200 x 150 x 350 mm",
      weight: "8 kg",
      powerRequirements: "CR2032 battery",
      operatingConditions: "Temperature: 15-25°C, Humidity: 45-65% RH",
      warranty: "1 year",
      compliance: ["DIN 862", "CE"]
    }
  }
];

// Additional Calibration Systems Products
const additionalCalibrationProducts = [
  {
    name: "DIM-CAL-200 Dimension Calibrator",
    category: "Calibration Systems",
    subcategory: "Dimension Calibrators",
    shortDescription: "High-precision dimension calibrator for length, diameter, and geometric measurements.",
    fullTechnicalInfo: "The DIM-CAL-200 is a high-precision dimension calibrator designed for calibrating length, diameter, and geometric measuring instruments. It features advanced measurement technology, high accuracy, and comprehensive calibration capabilities.",
    specifications: [
      { key: "Measuring Range", value: "0-200 mm" },
      { key: "Accuracy", value: "±0.001 mm" },
      { key: "Resolution", value: "0.0001 mm" },
      { key: "Measurement Type", value: "Length, Diameter, Geometry" },
      { key: "Display", value: "Digital LCD" },
      { key: "Interface", value: "USB, RS232" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Operating Temperature", value: "20±1°C" },
      { key: "Dimensions", value: "500 x 400 x 300 mm" },
      { key: "Weight", value: "25 kg" }
    ],
    featuresBenefits: [
      "High-precision measurement",
      "Multiple measurement types",
      "Digital display",
      "Data output capability",
      "Temperature compensation",
      "Easy calibration",
      "Comprehensive software",
      "Long-term stability"
    ],
    applications: [
      "Length measurement calibration",
      "Diameter measurement calibration",
      "Geometric measurement calibration",
      "Metrology laboratories",
      "Quality control",
      "Research and development",
      "Educational institutions",
      "Industrial calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "NIST traceable",
      "ISO 17025"
    ],
    technicalDetails: {
      dimensions: "500 x 400 x 300 mm",
      weight: "25 kg",
      powerRequirements: "220V AC, 50Hz, 100W",
      operatingConditions: "Temperature: 20±1°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["ISO 17025", "NIST traceable", "CE"]
    }
  },
  {
    name: "MASS-VOL-500 Mass and Volume Calibrator",
    category: "Calibration Systems",
    subcategory: "Mass and Volume",
    shortDescription: "Precision mass and volume calibrator for weighing instruments and volumetric measurements.",
    fullTechnicalInfo: "The MASS-VOL-500 is a precision mass and volume calibrator designed for calibrating weighing instruments and volumetric measuring devices. It features high-precision mass standards, volumetric measurement capabilities, and comprehensive calibration procedures.",
    specifications: [
      { key: "Mass Range", value: "1 mg - 500 kg" },
      { key: "Mass Accuracy", value: "Class E2" },
      { key: "Volume Range", value: "1 ml - 1000 ml" },
      { key: "Volume Accuracy", value: "±0.01% of reading" },
      { key: "Density Range", value: "0.5-20 g/cm³" },
      { key: "Temperature Control", value: "20±0.1°C" },
      { key: "Display", value: "Digital LCD" },
      { key: "Interface", value: "USB, RS232" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "600 x 500 x 400 mm" }
    ],
    featuresBenefits: [
      "High-precision mass standards",
      "Accurate volume measurement",
      "Temperature control",
      "Density measurement",
      "Digital display",
      "Data output capability",
      "Comprehensive calibration",
      "Traceable standards"
    ],
    applications: [
      "Weighing instrument calibration",
      "Volumetric measurement calibration",
      "Density determination",
      "Metrology laboratories",
      "Quality control",
      "Research and development",
      "Educational institutions",
      "Industrial calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "OIML R111",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "600 x 500 x 400 mm",
      weight: "50 kg",
      powerRequirements: "220V AC, 50Hz, 500W",
      operatingConditions: "Temperature: 20±0.1°C, Humidity: 45-65% RH",
      warranty: "2 years",
      compliance: ["OIML R111", "NIST traceable", "CE"]
    }
  },
  {
    name: "FLOW-CAL-1000 Flow Calibrator",
    category: "Calibration Systems",
    subcategory: "Flow Calibrator",
    shortDescription: "High-precision flow calibrator for flow meters and flow measurement instruments.",
    fullTechnicalInfo: "The FLOW-CAL-1000 is a high-precision flow calibrator designed for calibrating flow meters and flow measurement instruments. It features advanced flow control, precise measurement, and comprehensive calibration capabilities for various flow rates and fluid types.",
    specifications: [
      { key: "Flow Range", value: "0.1-1000 L/min" },
      { key: "Accuracy", value: "±0.1% of reading" },
      { key: "Flow Control", value: "Variable speed pump" },
      { key: "Fluid Types", value: "Water, Oil, Air" },
      { key: "Temperature Range", value: "5-50°C" },
      { key: "Pressure Range", value: "0-10 bar" },
      { key: "Display", value: "Digital LCD" },
      { key: "Interface", value: "USB, RS232" },
      { key: "Power Supply", value: "220V AC, 50Hz" },
      { key: "Dimensions", value: "800 x 600 x 500 mm" }
    ],
    featuresBenefits: [
      "High-precision flow measurement",
      "Variable flow control",
      "Multiple fluid compatibility",
      "Temperature and pressure control",
      "Digital display",
      "Data output capability",
      "Comprehensive calibration",
      "Easy operation"
    ],
    applications: [
      "Flow meter calibration",
      "Flow measurement calibration",
      "Process control calibration",
      "Metrology laboratories",
      "Quality control",
      "Research and development",
      "Educational institutions",
      "Industrial calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "ISO 17025",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "800 x 600 x 500 mm",
      weight: "100 kg",
      powerRequirements: "220V AC, 50Hz, 2kW",
      operatingConditions: "Temperature: 15-35°C, Humidity: 20-80% RH",
      warranty: "2 years",
      compliance: ["ISO 17025", "NIST traceable", "CE"]
    }
  }
];

async function addMoreProducts() {
  try {
    console.log('Starting to add more products...');

    // Combine all additional products
    const allAdditionalProducts = [
      ...additionalMetrologyProducts,
      ...additionalMeasuringProducts,
      ...additionalCalibrationProducts
    ];

    // Create products
    for (const productData of allAdditionalProducts) {
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

    console.log('Additional products added successfully!');
    console.log(`Added ${allAdditionalProducts.length} additional products`);

  } catch (error) {
    console.error('Error adding more products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addMoreProducts(); 
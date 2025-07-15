import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Meatest Multifunction Calibrator Products
const meatestMultifunctionCalibrators = [
  {
    name: "MEATEST M160i Precision Multifunction Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "High-precision multifunction calibrator for voltage, current, resistance, frequency, and temperature calibration with advanced features.",
    fullTechnicalInfo: "The MEATEST M160i is a state-of-the-art multifunction calibrator designed for comprehensive calibration of electrical measuring instruments. It provides high-accuracy outputs for voltage, current, resistance, frequency, and temperature measurements. The instrument features advanced calibration software, temperature compensation, and comprehensive error analysis capabilities.",
    specifications: [
      { key: "Voltage Range (DC)", value: "0 to ±1000V" },
      { key: "Voltage Range (AC)", value: "0 to 1000V (10Hz-100kHz)" },
      { key: "Current Range (DC)", value: "0 to ±20A" },
      { key: "Current Range (AC)", value: "0 to 20A (10Hz-100kHz)" },
      { key: "Resistance Range", value: "0 to 1GΩ" },
      { key: "Frequency Range", value: "0.1Hz to 1MHz" },
      { key: "Temperature Range", value: "-200°C to +1372°C" },
      { key: "Voltage Accuracy", value: "0.01% of reading + 0.005% of range" },
      { key: "Current Accuracy", value: "0.02% of reading + 0.01% of range" },
      { key: "Resistance Accuracy", value: "0.01% of reading + 0.005% of range" },
      { key: "Frequency Accuracy", value: "0.001% of reading" },
      { key: "Temperature Accuracy", value: "±0.1°C" },
      { key: "Resolution", value: "6½ digits" },
      { key: "Interface", value: "USB, RS232, GPIB, Ethernet" },
      { key: "Power Supply", value: "100-240V AC, 50/60Hz" },
      { key: "Operating Temperature", value: "0°C to +50°C" },
      { key: "Dimensions", value: "430 x 133 x 400 mm" },
      { key: "Weight", value: "8.5 kg" }
    ],
    featuresBenefits: [
      "Multifunction calibration capabilities",
      "High accuracy and stability",
      "Programmable output sequences",
      "Temperature compensation",
      "Comprehensive error analysis",
      "Multiple interface options",
      "User-friendly software interface",
      "Built-in self-calibration",
      "Wide measurement ranges",
      "Advanced calibration software",
      "Remote operation capability",
      "Data logging and analysis"
    ],
    applications: [
      "Calibration of digital multimeters",
      "Data logger calibration",
      "Process control instrument calibration",
      "Laboratory reference standards",
      "Quality assurance testing",
      "Research and development",
      "Metrology laboratories",
      "Industrial calibration services",
      "Temperature sensor calibration",
      "Frequency meter calibration",
      "Resistance bridge calibration",
      "Automated calibration systems"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "NIST traceable",
      "ISO 17025 compliant"
    ],
    technicalDetails: {
      dimensions: "430 x 133 x 400 mm",
      weight: "8.5 kg",
      powerRequirements: "100-240V AC, 50/60Hz, 50W",
      operatingConditions: "Temperature: 0-50°C, Humidity: 20-80% RH",
      warranty: "3 years",
      compliance: ["IEC 61010-1", "CE", "NIST traceable", "ISO 17025"]
    }
  },
  {
    name: "MEATEST M160i-2 Dual Channel Multifunction Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "Dual-channel multifunction calibrator for simultaneous calibration of multiple instruments with independent channel control.",
    fullTechnicalInfo: "The MEATEST M160i-2 is a dual-channel multifunction calibrator that provides independent control of two calibration channels. This advanced system allows simultaneous calibration of multiple instruments, significantly improving productivity in calibration laboratories. Each channel offers the same high accuracy and comprehensive measurement capabilities as the single-channel version.",
    specifications: [
      { key: "Channels", value: "2 independent channels" },
      { key: "Voltage Range (DC)", value: "0 to ±1000V per channel" },
      { key: "Voltage Range (AC)", value: "0 to 1000V per channel (10Hz-100kHz)" },
      { key: "Current Range (DC)", value: "0 to ±20A per channel" },
      { key: "Current Range (AC)", value: "0 to 20A per channel (10Hz-100kHz)" },
      { key: "Resistance Range", value: "0 to 1GΩ per channel" },
      { key: "Frequency Range", value: "0.1Hz to 1MHz per channel" },
      { key: "Temperature Range", value: "-200°C to +1372°C per channel" },
      { key: "Channel Isolation", value: ">1000V between channels" },
      { key: "Voltage Accuracy", value: "0.01% of reading + 0.005% of range" },
      { key: "Current Accuracy", value: "0.02% of reading + 0.01% of range" },
      { key: "Resistance Accuracy", value: "0.01% of reading + 0.005% of range" },
      { key: "Frequency Accuracy", value: "0.001% of reading" },
      { key: "Temperature Accuracy", value: "±0.1°C" },
      { key: "Resolution", value: "6½ digits" },
      { key: "Interface", value: "USB, Ethernet, GPIB" },
      { key: "Power Supply", value: "100-240V AC, 50/60Hz" },
      { key: "Operating Temperature", value: "0°C to +50°C" },
      { key: "Dimensions", value: "430 x 133 x 400 mm" },
      { key: "Weight", value: "10 kg" }
    ],
    featuresBenefits: [
      "Dual independent channels",
      "Simultaneous calibration capability",
      "High channel isolation",
      "Independent channel control",
      "Advanced synchronization features",
      "Comprehensive software control",
      "Built-in safety features",
      "Remote operation capability",
      "High accuracy and stability",
      "Programmable output sequences",
      "Temperature compensation",
      "Comprehensive error analysis"
    ],
    applications: [
      "Multi-function instrument calibration",
      "Simultaneous voltage/current testing",
      "Automated calibration systems",
      "High-volume calibration labs",
      "Research and development",
      "Metrology laboratories",
      "Industrial calibration services",
      "Temperature sensor calibration",
      "Frequency meter calibration",
      "Resistance bridge calibration"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "NIST traceable",
      "ISO 17025 compliant"
    ],
    technicalDetails: {
      dimensions: "430 x 133 x 400 mm",
      weight: "10 kg",
      powerRequirements: "100-240V AC, 50/60Hz, 100W",
      operatingConditions: "Temperature: 0-50°C, Humidity: 20-80% RH",
      warranty: "3 years",
      compliance: ["IEC 61010-1", "CE", "NIST traceable", "ISO 17025"]
    }
  },
  {
    name: "MEATEST PC160i Process Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "Versatile process calibrator for industrial process control instruments with multiple measurement and output capabilities.",
    fullTechnicalInfo: "The MEATEST PC160i is a versatile process calibrator designed for calibrating industrial process control instruments. It provides multiple output types and measurement capabilities including temperature sensors, pressure transmitters, flow meters, voltage, current, resistance, and frequency. The instrument is designed for both laboratory and field use with rugged construction and long battery life.",
    specifications: [
      { key: "Temperature Range", value: "-200°C to +1372°C" },
      { key: "Pressure Range", value: "0 to 400 bar" },
      { key: "Voltage Range (DC)", value: "0 to 100V" },
      { key: "Voltage Range (AC)", value: "0 to 100V (10Hz-100kHz)" },
      { key: "Current Range (DC)", value: "0 to 24mA" },
      { key: "Current Range (AC)", value: "0 to 24mA (10Hz-100kHz)" },
      { key: "Resistance Range", value: "0 to 400Ω" },
      { key: "Frequency Range", value: "0 to 100kHz" },
      { key: "Voltage Accuracy", value: "0.01% of reading" },
      { key: "Current Accuracy", value: "0.02% of reading" },
      { key: "Resistance Accuracy", value: "0.01% of reading" },
      { key: "Temperature Accuracy", value: "±0.1°C" },
      { key: "Pressure Accuracy", value: "0.025% of reading" },
      { key: "Frequency Accuracy", value: "0.001% of reading" },
      { key: "Resolution", value: "5½ digits" },
      { key: "Battery Life", value: "Up to 8 hours continuous use" },
      { key: "Interface", value: "USB, Bluetooth (optional)" },
      { key: "Operating Temperature", value: "-10°C to +50°C" },
      { key: "Dimensions", value: "250 x 100 x 50 mm" },
      { key: "Weight", value: "1.2 kg" }
    ],
    featuresBenefits: [
      "Multiple measurement types",
      "Long battery life",
      "Rugged field design",
      "Easy-to-use interface",
      "Comprehensive documentation",
      "Calibration certificate included",
      "Portable and lightweight",
      "High accuracy and stability",
      "Temperature compensation",
      "Data logging capability",
      "Bluetooth connectivity option",
      "Field-replaceable sensors"
    ],
    applications: [
      "Temperature sensor calibration",
      "Pressure transmitter calibration",
      "Flow meter calibration",
      "Industrial process control",
      "Field calibration services",
      "Maintenance and troubleshooting",
      "Quality control testing",
      "Research and development",
      "Educational institutions",
      "Service and repair"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "IP54 protection",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "250 x 100 x 50 mm",
      weight: "1.2 kg",
      powerRequirements: "Rechargeable Li-ion battery, 8 hours",
      operatingConditions: "Temperature: -10 to +50°C, Humidity: 10-90% RH",
      warranty: "2 years",
      compliance: ["IEC 61010-1", "CE", "IP54", "NIST traceable"]
    }
  },
  {
    name: "MEATEST MC160i Micro Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "Compact micro calibrator for voltage, current, and resistance measurements with high accuracy and portability.",
    fullTechnicalInfo: "The MEATEST MC160i is a compact micro calibrator designed for voltage, current, and resistance measurements. Despite its small size, it provides high accuracy and comprehensive calibration capabilities. The instrument is ideal for field use, maintenance work, and applications where portability is essential.",
    specifications: [
      { key: "Voltage Range (DC)", value: "0 to ±100V" },
      { key: "Voltage Range (AC)", value: "0 to 100V (10Hz-100kHz)" },
      { key: "Current Range (DC)", value: "0 to ±20mA" },
      { key: "Current Range (AC)", value: "0 to 20mA (10Hz-100kHz)" },
      { key: "Resistance Range", value: "0 to 100kΩ" },
      { key: "Voltage Accuracy", value: "0.02% of reading" },
      { key: "Current Accuracy", value: "0.05% of reading" },
      { key: "Resistance Accuracy", value: "0.02% of reading" },
      { key: "Resolution", value: "5½ digits" },
      { key: "Battery Life", value: "Up to 12 hours continuous use" },
      { key: "Interface", value: "USB" },
      { key: "Operating Temperature", value: "-10°C to +50°C" },
      { key: "Dimensions", value: "180 x 80 x 35 mm" },
      { key: "Weight", value: "0.5 kg" }
    ],
    featuresBenefits: [
      "Compact and portable design",
      "Long battery life",
      "High accuracy for size",
      "Easy-to-use interface",
      "Rugged construction",
      "USB connectivity",
      "Data logging capability",
      "Affordable calibration solution",
      "Field-replaceable battery",
      "Comprehensive documentation"
    ],
    applications: [
      "Field calibration services",
      "Maintenance and troubleshooting",
      "Educational institutions",
      "Small laboratories",
      "Portable measurement needs",
      "Service and repair",
      "Quality control testing",
      "Research and development",
      "Industrial maintenance",
      "Mobile calibration services"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "IP52 protection",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "180 x 80 x 35 mm",
      weight: "0.5 kg",
      powerRequirements: "Rechargeable Li-ion battery, 12 hours",
      operatingConditions: "Temperature: -10 to +50°C, Humidity: 10-90% RH",
      warranty: "1 year",
      compliance: ["IEC 61010-1", "CE", "IP52", "NIST traceable"]
    }
  },
  {
    name: "MEATEST TC160i Temperature Calibrator",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "Specialized temperature calibrator for thermocouples, RTDs, and temperature sensors with high precision and stability.",
    fullTechnicalInfo: "The MEATEST TC160i is a specialized temperature calibrator designed for calibrating thermocouples, RTDs, and temperature sensors. It provides high precision temperature simulation and measurement capabilities with excellent stability and accuracy. The instrument supports all major thermocouple types and RTD configurations.",
    specifications: [
      { key: "Temperature Range", value: "-200°C to +1372°C" },
      { key: "Temperature Accuracy", value: "±0.1°C" },
      { key: "Temperature Stability", value: "±0.01°C" },
      { key: "Thermocouple Types", value: "K, J, T, E, R, S, B, N, C" },
      { key: "RTD Types", value: "PT100, PT1000, Cu100, Ni100" },
      { key: "Resistance Range", value: "0 to 400Ω" },
      { key: "Voltage Range", value: "-10mV to +100mV" },
      { key: "Resistance Accuracy", value: "0.01% of reading" },
      { key: "Voltage Accuracy", value: "0.01% of reading" },
      { key: "Resolution", value: "0.001°C" },
      { key: "Battery Life", value: "Up to 10 hours continuous use" },
      { key: "Interface", value: "USB, Bluetooth (optional)" },
      { key: "Operating Temperature", value: "-10°C to +50°C" },
      { key: "Dimensions", value: "220 x 100 x 45 mm" },
      { key: "Weight", value: "0.8 kg" }
    ],
    featuresBenefits: [
      "High temperature accuracy",
      "Excellent temperature stability",
      "Multiple thermocouple support",
      "Multiple RTD support",
      "Long battery life",
      "Compact and portable",
      "Easy-to-use interface",
      "Comprehensive documentation",
      "Calibration certificate included",
      "Data logging capability",
      "Bluetooth connectivity option",
      "Field-replaceable sensors"
    ],
    applications: [
      "Thermocouple calibration",
      "RTD calibration",
      "Temperature sensor calibration",
      "Thermometer calibration",
      "Industrial temperature control",
      "Laboratory temperature standards",
      "Quality control testing",
      "Research and development",
      "Educational institutions",
      "Service and repair"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "IEC 61010-1",
      "IP54 protection",
      "NIST traceable"
    ],
    technicalDetails: {
      dimensions: "220 x 100 x 45 mm",
      weight: "0.8 kg",
      powerRequirements: "Rechargeable Li-ion battery, 10 hours",
      operatingConditions: "Temperature: -10 to +50°C, Humidity: 10-90% RH",
      warranty: "2 years",
      compliance: ["IEC 61010-1", "CE", "IP54", "NIST traceable"]
    }
  },
  {
    name: "MEATEST Calibration Software Suite",
    category: "Calibration Systems",
    subcategory: "Electrical Calibrators",
    shortDescription: "Comprehensive calibration software for automated calibration, data management, and report generation for all MEATEST instruments.",
    fullTechnicalInfo: "The MEATEST Calibration Software Suite provides comprehensive tools for automated calibration, data management, and report generation. This software supports all MEATEST calibration instruments and provides advanced features for calibration laboratories and industrial applications. It includes uncertainty analysis, compliance reporting, and multi-user support.",
    specifications: [
      { key: "Supported Instruments", value: "All MEATEST calibrators" },
      { key: "Operating System", value: "Windows 10/11" },
      { key: "Database", value: "SQL Server, SQLite" },
      { key: "Report Formats", value: "PDF, Excel, Word, HTML" },
      { key: "Calibration Standards", value: "ISO 17025, ANSI Z540, JJF 1059" },
      { key: "Uncertainty Analysis", value: "Built-in calculations" },
      { key: "Multi-user Support", value: "Yes" },
      { key: "Cloud Integration", value: "Optional" },
      { key: "Data Backup", value: "Automatic and manual" },
      { key: "Audit Trail", value: "Complete history tracking" },
      { key: "User Management", value: "Role-based access control" },
      { key: "API Support", value: "REST API available" }
    ],
    featuresBenefits: [
      "Automated calibration procedures",
      "Comprehensive data management",
      "Advanced reporting capabilities",
      "Uncertainty analysis tools",
      "Multi-user support",
      "Cloud integration options",
      "Compliance with standards",
      "Easy-to-use interface",
      "Data backup and recovery",
      "Audit trail functionality",
      "User management system",
      "API integration capability"
    ],
    applications: [
      "Automated calibration systems",
      "Calibration laboratory management",
      "Quality assurance systems",
      "Compliance reporting",
      "Data analysis and trending",
      "Remote calibration monitoring",
      "Multi-site calibration management",
      "Research and development",
      "Educational institutions",
      "Industrial calibration services"
    ],
    certifications: [
      "ISO 9001:2015",
      "CE Marking",
      "ISO 17025 compliant",
      "ANSI Z540 compliant"
    ],
    technicalDetails: {
      dimensions: "Software only",
      weight: "N/A",
      powerRequirements: "Standard PC requirements",
      operatingConditions: "Windows 10/11 environment",
      warranty: "1 year software support",
      compliance: ["ISO 17025", "ANSI Z540", "JJF 1059"]
    }
  }
];

async function addMeatestMultifunctionCalibrators() {
  try {
    console.log('Starting to add MEATEST multifunction calibrator products...');

    // Ensure the category and subcategory exist
    let category = await prisma.category.findFirst({ 
      where: { name: "Calibration Systems" } 
    });
    
    if (!category) {
      category = await prisma.category.create({ 
        data: { name: "Calibration Systems" } 
      });
      console.log('Created category: Calibration Systems');
    }

    let subcategory = await prisma.subcategory.findFirst({ 
      where: { 
        name: "Electrical Calibrators",
        categoryId: category.id 
      } 
    });
    
    if (!subcategory) {
      subcategory = await prisma.subcategory.create({ 
        data: { 
          name: "Electrical Calibrators",
          categoryId: category.id 
        } 
      });
      console.log('Created subcategory: Electrical Calibrators');
    }

    // Add products
    for (const productData of meatestMultifunctionCalibrators) {
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
          imageUrl: `/uploads/products/meatest-${productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.jpg`,
          homeFeatured: false,
          rank: 0,
          views: 0
        }
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('Successfully added all MEATEST multifunction calibrator products!');
  } catch (error) {
    console.error('Error adding MEATEST products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
addMeatestMultifunctionCalibrators(); 
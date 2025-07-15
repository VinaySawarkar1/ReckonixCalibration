import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 10 Vision Measuring Machine products from Unimetro
const visionMeasuringProducts = [
  // VM-3020 Vision Measuring Machine
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
  // VM-3021 Vision Measuring Machine
  {
    name: "VM-3021 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3021 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3022 Vision Measuring Machine
  {
    name: "VM-3022 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3022 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3023 Vision Measuring Machine
  {
    name: "VM-3023 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3023 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3024 Vision Measuring Machine
  {
    name: "VM-3024 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3024 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3025 Vision Measuring Machine
  {
    name: "VM-3025 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3025 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3026 Vision Measuring Machine
  {
    name: "VM-3026 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3026 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3027 Vision Measuring Machine
  {
    name: "VM-3027 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3027 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3028 Vision Measuring Machine
  {
    name: "VM-3028 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3028 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3029 Vision Measuring Machine
  {
    name: "VM-3029 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3029 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  // VM-3030 Vision Measuring Machine
  {
    name: "VM-3030 Vision Measuring Machine",
    category: "Metrology Systems",
    subcategory: "Vision Measuring Machine",
    shortDescription: "High-precision vision measuring machine for 2D and 3D measurement with advanced image processing.",
    fullTechnicalInfo: "The VM-3030 is a state-of-the-art vision measuring machine designed for high-precision 2D and 3D measurement applications. It features advanced image processing technology, high-resolution cameras, and comprehensive measurement software for accurate dimensional analysis.",
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
  }
];

// 10 Datalogger products from Polwax
const dataloggerProducts = [
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  },
  // CLIMA Connect Mobile Datalogger
  {
    name: "CLIMA Connect Mobile Datalogger",
    category: "Measuring Systems",
    subcategory: "Dataloggers",
    shortDescription: "Portable mobile datalogger for temperature and humidity monitoring with wireless connectivity.",
    fullTechnicalInfo: "The CLIMA Connect Mobile Datalogger is a portable device designed for temperature and humidity monitoring in various environments. It features wireless connectivity, high-precision sensors, and mobile app integration for real-time data access.",
    specifications: [
      { key: "Temperature Range", value: "-40 to +80°C" },
      { key: "Temperature Accuracy", value: "±0.3°C" },
      { key: "Humidity Range", value: "0-100% RH" },
      { key: "Humidity Accuracy", value: "±2% RH" },
      { key: "Logging Interval", value: "1 second to 24 hours" },
      { key: "Memory Capacity", value: "16,000 data points" },
      { key: "Connectivity", value: "Bluetooth, USB" },
      { key: "Power Supply", value: "2x AA batteries" },
      { key: "Battery Life", value: "6 months" },
      { key: "Dimensions", value: "100 x 60 x 25 mm" }
    ],
    featuresBenefits: [
      "Portable design",
      "Wireless connectivity",
      "Mobile app integration",
      "Long battery life",
      "Easy configuration",
      "Real-time monitoring",
      "Data export capabilities",
      "Alarm notifications"
    ],
    applications: [
      "Field monitoring",
      "Transport monitoring",
      "Environmental studies",
      "Research projects",
      "Quality control",
      "Compliance monitoring",
      "Educational use",
      "Personal monitoring"
    ],
    certifications: [
      "CE Marking",
      "RoHS",
      "FCC",
      "ISO 9001:2015"
    ],
    technicalDetails: {
      dimensions: "100 x 60 x 25 mm",
      weight: "80 g",
      powerRequirements: "2x AA batteries",
      operatingConditions: "Temperature: -40 to +80°C, Humidity: 0-100% RH",
      warranty: "2 years",
      compliance: ["CE", "RoHS", "FCC"]
    }
  }
];

async function addProducts() {
  try {
    for (const product of visionMeasuringProducts) {
      await prisma.product.create({
        data: {
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          shortDescription: product.shortDescription,
          fullTechnicalInfo: product.fullTechnicalInfo,
          specifications: JSON.stringify(product.specifications),
          featuresBenefits: JSON.stringify(product.featuresBenefits),
          applications: JSON.stringify(product.applications),
          certifications: JSON.stringify(product.certifications),
          technicalDetails: JSON.stringify(product.technicalDetails),
          imageUrl: `/uploads/products/default-${product.category.toLowerCase().replace(/ /g, '-')}.jpg`,
          homeFeatured: false,
          rank: 0,
          views: 0
        }
      });
      console.log(`Added: ${product.name}`);
    }
    for (const product of dataloggerProducts) {
      await prisma.product.create({
        data: {
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          shortDescription: product.shortDescription,
          fullTechnicalInfo: product.fullTechnicalInfo,
          specifications: JSON.stringify(product.specifications),
          featuresBenefits: JSON.stringify(product.featuresBenefits),
          applications: JSON.stringify(product.applications),
          certifications: JSON.stringify(product.certifications),
          technicalDetails: JSON.stringify(product.technicalDetails),
          imageUrl: `/uploads/products/default-${product.category.toLowerCase().replace(/ /g, '-')}.jpg`,
          homeFeatured: false,
          rank: 0,
          views: 0
        }
      });
      console.log(`Added: ${product.name}`);
    }
    console.log('All products added successfully!');
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProducts(); 
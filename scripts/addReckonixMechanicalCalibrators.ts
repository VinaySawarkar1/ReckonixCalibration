import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    name: "Tape And Scale Calibration Unit",
    shortDescription: "Unit for precise calibration of measuring tapes and scales up to 1000mm.",
    fullTechnicalInfo: "The Tape and Scale Calibration Unit is essential for calibrating steel rules, measuring scales, and tapes. It features a variable loading system, easy alignment, and digital image comparison with 10X magnification. Accessories include software, rotating wheel, and tension weight.",
    specifications: [
      { key: "Measuring Range", value: "up to 1000mm" },
      { key: "Accessories", value: "Software copy, rotating wheel, weight for tension" },
      { key: "Service Location", value: "Pan India" },
      { key: "Manufacturing Facility", value: "Pune" }
    ],
    featuresBenefits: [
      "Calibrates steel rules, scales, and tapes",
      "Digital image comparison (10X)",
      "Variable loading system",
      "Easy alignment system",
      "Wide industrial application"
    ],
    applications: [
      "Civil, mechanical, textile industries",
      "Society measurement standards",
      "Laboratories"
    ],
    certifications: ["ISO 9001:2015"],
    imageUrl: "https://www.reckonix.in/images/tape-scale-calibration-unit.jpg",
    technicalDetails: {
      dimensions: "N/A",
      weight: "N/A",
      powerRequirements: "N/A",
      operatingConditions: "N/A",
      warranty: "1 year",
      compliance: ["ISO 9001:2015"]
    }
  },
  {
    name: "Analog Dial Calibration Tester",
    shortDescription: "Analog dial calibration tester for industrial applications.",
    fullTechnicalInfo: "The Analog Dial Calibration Tester offers 0.01% accuracy, digital display, and robust CI casting construction. Designed for industrial calibration of analog dials.",
    specifications: [
      { key: "Accuracy", value: "0.01%" },
      { key: "Display Type", value: "Digital" },
      { key: "Material", value: "CI Casting" },
      { key: "Power Source", value: "Electrical" }
    ],
    featuresBenefits: [
      "High accuracy",
      "Digital display",
      "Industrial grade construction"
    ],
    applications: ["Industrial calibration", "Laboratories"],
    certifications: ["ISO 9001:2015"],
    imageUrl: "https://www.reckonix.in/images/analog-dial-calibration-tester.jpg",
    technicalDetails: {
      dimensions: "N/A",
      weight: "N/A",
      powerRequirements: "Electrical",
      operatingConditions: "N/A",
      warranty: "1 year",
      compliance: ["ISO 9001:2015"]
    }
  },
  {
    name: "Stainless Steel Electronic Dial Calibration Tester",
    shortDescription: "Stainless steel electronic dial calibration tester for industrial use.",
    fullTechnicalInfo: "This tester features a digital display, stainless steel construction, and is designed for industrial calibration of electronic dials. Operates at 50 Hz.",
    specifications: [
      { key: "Material", value: "Stainless Steel" },
      { key: "Display Type", value: "Digital" },
      { key: "Frequency", value: "50 Hz" },
      { key: "Power Source", value: "Electrical" }
    ],
    featuresBenefits: [
      "Stainless steel build",
      "Digital display",
      "Industrial application"
    ],
    applications: ["Industrial calibration", "Laboratories"],
    certifications: ["ISO 9001:2015"],
    imageUrl: "https://www.reckonix.in/images/ss-electronic-dial-calibration-tester.jpg",
    technicalDetails: {
      dimensions: "N/A",
      weight: "N/A",
      powerRequirements: "Electrical",
      operatingConditions: "N/A",
      warranty: "1 year",
      compliance: ["ISO 9001:2015"]
    }
  },
  {
    name: "Dial Calibration Tester",
    shortDescription: "Digital dial calibration tester for laboratory use.",
    fullTechnicalInfo: "Model RXDCT25, made of SS with Sylvac dial, digital display, and +/-2um accuracy. Designed for laboratory calibration.",
    specifications: [
      { key: "Model Name/Number", value: "RXDCT25" },
      { key: "Material", value: "SS with Sylvac dial" },
      { key: "Display Type", value: "Digital" },
      { key: "Accuracy", value: "+/-2um" }
    ],
    featuresBenefits: [
      "Digital display",
      "High accuracy",
      "Laboratory grade"
    ],
    applications: ["Laboratory calibration", "Quality control"],
    certifications: ["ISO 9001:2015"],
    imageUrl: "https://www.reckonix.in/images/dial-calibration-tester.jpg",
    technicalDetails: {
      dimensions: "N/A",
      weight: "N/A",
      powerRequirements: "N/A",
      operatingConditions: "N/A",
      warranty: "1 year",
      compliance: ["ISO 9001:2015"]
    }
  },
  {
    name: "Steel Caliper Checker",
    shortDescription: "Precision caliper checker for verifying caliper accuracy (0-1000mm).",
    fullTechnicalInfo: "The Steel Caliper Checker is engineered for verifying and calibrating calipers. It features robust stainless steel construction, 0.001mm accuracy, and is portable for on-site calibration. Provides calibration traceability and detailed reports.",
    specifications: [
      { key: "Measuring Range", value: "0 - 1000 mm" },
      { key: "Material", value: "Stainless Steel" },
      { key: "Size/Dimension", value: "1000 mm" },
      { key: "Accuracy", value: "0.001 mm" }
    ],
    featuresBenefits: [
      "Accurate calibration",
      "User-friendly design",
      "Versatile compatibility",
      "Robust construction",
      "Calibration traceability",
      "Comprehensive testing",
      "Portable and convenient"
    ],
    applications: ["Laboratory calibration", "Industrial calibration", "On-site verification"],
    certifications: ["ISO 9001:2015"],
    imageUrl: "https://www.reckonix.in/images/steel-caliper-checker.jpg",
    technicalDetails: {
      dimensions: "1000 mm",
      weight: "N/A",
      powerRequirements: "N/A",
      operatingConditions: "N/A",
      warranty: "1 year",
      compliance: ["ISO 9001:2015"]
    }
  }
];

async function main() {
  // Ensure category exists
  let category = await prisma.category.findFirst({ where: { name: "Calibration Systems" } });
  if (!category) {
    category = await prisma.category.create({ data: { name: "Calibration Systems" } });
  }

  // Ensure subcategory exists
  let subcategory = await prisma.subcategory.findFirst({ where: { name: "Dimension Calibrators", categoryId: category.id } });
  if (!subcategory) {
    subcategory = await prisma.subcategory.create({ data: { name: "Dimension Calibrators", categoryId: category.id } });
  }

  for (const prod of products) {
    await prisma.product.create({
      data: {
        name: prod.name,
        category: category.name,
        subcategory: subcategory.name,
        shortDescription: prod.shortDescription,
        fullTechnicalInfo: prod.fullTechnicalInfo,
        specifications: JSON.stringify(prod.specifications),
        featuresBenefits: JSON.stringify(prod.featuresBenefits),
        applications: JSON.stringify(prod.applications),
        certifications: JSON.stringify(prod.certifications),
        imageUrl: prod.imageUrl,
        technicalDetails: JSON.stringify(prod.technicalDetails),
        homeFeatured: false,
        rank: 0,
        views: 0
      }
    });
    console.log(`Added product: ${prod.name}`);
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mainCategory = "Metrology Systems";
const subcategories = [
  {
    name: "Manual Vision Measuring Machines",
    products: [
      {
        name: "BASIC200",
        technical: {
          "Measuring Range": "200 × 100 × 200 mm",
          Accuracy: "2.5+L/100",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "BASIC300",
        technical: {
          "Measuring Range": "300 × 200 × 200 mm",
          Accuracy: "2.5+L/100",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "BASIC400",
        technical: {
          "Measuring Range": "400 × 300 × 200 mm",
          Accuracy: "2.5+L/100",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "BASIC500",
        technical: {
          "Measuring Range": "500 × 400 × 200 mm",
          Accuracy: "2.5+L/100",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      }
    ]
  },
  {
    name: "Semi-Automatic Vision Measuring Machines",
    products: [
      {
        name: "EXTRA200",
        technical: {
          "Measuring Range": "200 × 100 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "EXTRA300",
        technical: {
          "Measuring Range": "300 × 200 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "EXTRA400",
        technical: {
          "Measuring Range": "400 × 300 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      },
      {
        name: "EXTRA500",
        technical: {
          "Measuring Range": "500 × 400 × 200 mm",
          Accuracy: "3+L/200",
          Repeatability: "3um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "90mm",
          Resolution: "0.5um"
        }
      }
    ]
  },
  {
    name: "Fully Automatic Vision Measuring Machines",
    products: [
      {
        name: "ULTRA300",
        technical: {
          "Measuring Range": "300 × 200 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "82mm",
          Resolution: "0.1um"
        }
      },
      {
        name: "ULTRA400",
        technical: {
          "Measuring Range": "400 × 300 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "82mm",
          Resolution: "0.1um"
        }
      },
      {
        name: "ULTRA500",
        technical: {
          "Measuring Range": "500 × 400 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "82mm",
          Resolution: "0.1um"
        }
      },
      {
        name: "ULTRA600",
        technical: {
          "Measuring Range": "600 × 500 × 200 mm",
          Accuracy: "2.5+L/200",
          Repeatability: "2.5um",
          "Video Magnification": "18~195X",
          "Field of View": "8.1~1.3mm",
          "Working Distance": "82mm",
          Resolution: "0.1um"
        }
      }
    ]
  }
];

async function main() {
  // Ensure main category exists
  let category = await prisma.category.findFirst({ where: { name: mainCategory } });
  if (!category) {
    category = await prisma.category.create({ data: { name: mainCategory } });
  }

  for (const subcat of subcategories) {
    // Ensure subcategory exists
    let subcategory = await prisma.subcategory.findFirst({ where: { name: subcat.name, categoryId: category.id } });
    if (!subcategory) {
      subcategory = await prisma.subcategory.create({ data: { name: subcat.name, categoryId: category.id } });
    }

    for (const prod of subcat.products) {
      const technicalDetails = prod.technical;
      const specifications = Object.entries(technicalDetails).map(([key, value]) => ({ key, value }));

      await prisma.product.create({
        data: {
          name: prod.name,
          category: mainCategory,
          subcategory: subcat.name,
          shortDescription: `High-precision ${subcat.name.toLowerCase()} for advanced industrial inspection.`,
          fullTechnicalInfo: Object.entries(technicalDetails).map(([k, v]) => `${k}: ${v}`).join(', '),
          specifications: JSON.stringify(specifications),
          featuresBenefits: JSON.stringify([
            "High accuracy",
            "Stable structure",
            "Advanced measurement performance"
          ]),
          applications: JSON.stringify([
            "Industrial manufacturing",
            "Electronics",
            "Automotive"
          ]),
          certifications: JSON.stringify([]),
          imageUrl: "", // Add image URLs if you have them
          homeFeatured: false,
          technicalDetails: JSON.stringify(technicalDetails),
          rank: 0,
          views: 0
        }
      });
      console.log(`Added product: ${prod.name} (${subcat.name})`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const customers = [
  {
    name: 'Tata Motors',
    location: 'Mumbai, India',
    industry: 'Automotive',
    featured: true,
  },
  {
    name: 'DRDO',
    location: 'New Delhi, India',
    industry: 'Defense',
    featured: true,
  },
  {
    name: 'Cipla',
    location: 'Mumbai, India',
    industry: 'Pharmaceuticals',
    featured: true,
  },
  {
    name: 'ISRO',
    location: 'Bengaluru, India',
    industry: 'Aerospace',
    featured: true,
  },
  {
    name: 'Reliance Industries',
    location: 'Mumbai, India',
    industry: 'Conglomerate',
    featured: true,
  },
  {
    name: 'IIT Bombay',
    location: 'Mumbai, India',
    industry: 'Education',
    featured: true,
  },
  {
    name: 'Bosch',
    location: 'Bengaluru, India',
    industry: 'Engineering',
    featured: true,
  },
];

async function main() {
  for (const customer of customers) {
    try {
      await prisma.customer.create({ data: customer });
    } catch (e: any) {
      if (e.code === 'P2002') {
        // Unique constraint failed, skip
        continue;
      } else {
        console.error(e);
      }
    }
  }
  console.log('Customers seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const productNames = [
  "BASIC200", "BASIC300", "BASIC400", "BASIC500",
  "EXTRA200", "EXTRA300", "EXTRA400", "EXTRA500",
  "ULTRA300", "ULTRA400", "ULTRA500", "ULTRA600"
];

async function main() {
  await prisma.product.deleteMany({
    where: { name: { in: productNames } }
  });
  console.log("Deleted all Unimetro products.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); }); 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Upsert admin user
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: { password: 'admin123', role: 'admin' },
    create: { username: 'admin', password: 'admin123', role: 'admin' },
  });
  console.log('Admin user created or updated!');
}

main().finally(() => prisma.$disconnect()); 
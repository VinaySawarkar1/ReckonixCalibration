import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const productImages = [
  { name: "BASIC200", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "BASIC300", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "BASIC400", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "BASIC500", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "EXTRA200", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "EXTRA300", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "EXTRA400", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "EXTRA500", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "ULTRA300", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "ULTRA400", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "ULTRA500", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
  { name: "ULTRA600", imageUrl: "https://unimetro.cn/uploads/2022/12/13/20221213101913_36536.jpg" },
];

async function main() {
  for (const prod of productImages) {
    await prisma.product.updateMany({
      where: { name: prod.name },
      data: { imageUrl: prod.imageUrl }
    });
    console.log(`Updated image for ${prod.name}`);
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
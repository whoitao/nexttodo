import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Learn Next.js 14' },
      { title: 'Explore Prisma ORM' },
      { title: 'Build Full-Stack App' },
    ],
  });
}

main().finally(() => prisma.$disconnect());
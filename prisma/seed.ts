import prisma from "./utils/prisma-logger";

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { id: '7c744383-c745-48bb-965e-cfc310fbb2fc' },
    update: {},
    create: {
      id: '7c744383-c745-48bb-965e-cfc310fbb2fc',
      name: 'admin',
    },
  });

  const consumerRole = await prisma.role.upsert({
    where: { id: '0f0462d9-11a6-41b6-8e90-8be83206fdba' },
    update: {},
    create: {
      id: '0f0462d9-11a6-41b6-8e90-8be83206fdba',
      name: 'consumer',
    },
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);

  const test = await prisma.user.upsert({
    where: { email: 'test@test.io' },
    update: {},
    create: {
      role: 'WORKER',
      email: 'test@test.io',
      name: 'test1',
      password: hashedPassword,
    },
  });
  const siteTest = await prisma.site.upsert({
    where: { name: 'Chantier 1' },
    update: {},
    create: {
      name: 'Chantier 1',
    },
  });
  console.log({ test, siteTest });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      username: 'admin_utama',
      email: 'admin@tpi.or.id',
      name: 'Admin Utama',
      password: hashedPassword,
      jabatan: 'Chief Editor',
    },
  });

  console.log("✅ Berhasil");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
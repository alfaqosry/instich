import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ================= SAVE FILE =================
async function saveFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;

  // 🔥 folder upload
  const uploadDir = path.join(process.cwd(), 'public/uploads/team');
  const filePath = path.join(uploadDir, fileName);

  // 🔥 FIX ERROR ENOENT (AUTO CREATE FOLDER)
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);

  return `/uploads/team/${fileName}`;
}

// ================= GET ALL =================
export async function GET() {
  const data = await prisma.team.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(data);
}

// ================= CREATE =================
export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const order = Number(formData.get('order') || 0);
  const file = formData.get('image') as File | null;

  let imagePath = '';

  if (file && file.size > 0) {
    imagePath = await saveFile(file);
  }

  const data = await prisma.team.create({
    data: {
      name,
      role,
      order,
      image: imagePath,
    },
  });

  return NextResponse.json(data);
}
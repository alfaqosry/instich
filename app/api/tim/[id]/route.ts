import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const runtime = 'nodejs';

// Fungsi saveFile tetap sama
async function saveFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`; // Hapus spasi di nama file
  const dirPath = path.join(process.cwd(), 'public/uploads/team');
  
  // Pastikan folder ada sebelum tulis file
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, fileName);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/team/${fileName}`;
}

// UPDATE (PUT)
export async function PUT(
  req: Request,
  { params }: { params: any } // Gunakan any atau tipe yang tepat untuk handle Promise params
) {
  try {
    const formData = await req.formData();
    // Di Next.js terbaru, params harus di-await jika tipenya Promise
    const resolvedParams = await params; 
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID harus berupa angka" }, { status: 400 });
    }

    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const order = Number(formData.get('order'));
    const imageFile = formData.get('image') as File | null;

    let imagePath;
    if (imageFile && imageFile.size > 0 && typeof imageFile !== 'string') {
      imagePath = await saveFile(imageFile);
    }

    const data = await prisma.team.update({
      where: { id: id },
      data: {
        name,
        role,
        order,
        ...(imagePath ? { image: imagePath } : {}),
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: any }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    // 1. Cari dulu datanya untuk hapus file gambar fisiknya (Opsional tapi bagus)
    const member = await prisma.team.findUnique({ where: { id } });
    
    if (!member) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    // 2. Hapus dari Database
    await prisma.team.delete({
      where: { id },
    });

    // 3. Hapus file gambar dari server agar tidak memenuhi storage
    if (member.image) {
      const fullPath = path.join(process.cwd(), 'public', member.image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    return NextResponse.json({ message: 'deleted' });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ 
      error: error.code === 'P2025' ? "Data sudah tidak ada" : "Gagal menghapus data" 
    }, { status: 500 });
  }
}
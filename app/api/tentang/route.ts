import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET (ambil config)
export async function GET() {
    try {
        const tentang = await prisma.aboutConfig.findFirst(); 
        
        // JANGAN kembalikan null atau Response kosong
        // SELALU kembalikan objek JSON
        return NextResponse.json(tentang || { content: '', history: '' });
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
    }
}

// PUT (update config)
export async function PUT(req: Request) {
  const body = await req.json();

  const updated = await prisma.aboutConfig.upsert({
    where: { id: 1 },
    update: {
      content: body.content,
      history: body.history,
    },
    create: {
      id: 1,
      content: body.content,
      history: body.history,
    },
  });

  return NextResponse.json(updated);
}
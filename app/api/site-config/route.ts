import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET (ambil config)
export async function GET() {
  const data = await prisma.siteConfig.findUnique({
    where: { id: 1 },
  });

  return NextResponse.json(data);
}

// PUT (update config)
export async function PUT(req: Request) {
  const body = await req.json();

  const updated = await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      deskripsi: body.deskripsi,
    },
    create: {
      id: 1,
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      deskripsi: body.deskripsi,
    },
  });

  return NextResponse.json(updated);
}
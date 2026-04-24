import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET (ambil config)
export async function GET() {
  const data = await prisma.contactConfig.findUnique({
    where: { id: 1 },
  });

  return NextResponse.json(data);
}

// PUT (update config)
export async function PUT(req: Request) {
  const body = await req.json();

  const updated = await prisma.contactConfig.upsert({
    where: { id: 1 },
    update: {
      address: body.address,
      phone: body.phone,
      email: body.email,
      website: body.website,
    },
    create: {
      id: 1,
      address: body.address,
      phone: body.phone,
      email: body.email,
      website: body.website,
    },
  });

  return NextResponse.json(updated);
}
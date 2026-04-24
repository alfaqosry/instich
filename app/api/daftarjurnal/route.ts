import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET ALL
export async function GET() {
  const data = await prisma.journal.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(data);
}

// CREATE
export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.journal.create({
    data: {
      name: body.name,
      description: body.description,
      icon: body.icon,
      link: body.link,
      order: Number(body.order), 
    },
  });


  return NextResponse.json(data);
}
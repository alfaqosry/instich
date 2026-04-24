import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();

  const { id } = await params; // ✅ INI WAJIB

  console.log("UPDATE BODY:", body);
  console.log("ID:", id);

  const data = await prisma.journal.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      description: body.description,
      icon: body.icon,
      link: body.link,
      order: Number(body.order),
    },
  });

  return Response.json(data);
}
// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.journal.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: 'deleted' });
}
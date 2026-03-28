// app/api/tasks/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const myparams = await params;
  const id = parseInt(myparams.id);
  const data = await req.json();
  console.log('dddddd', params, id, data);
  try {
    const updated = await prisma.task.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed.' }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const myparams = await params;
  const id = parseInt(myparams.id);

  try {
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Task deleted.' });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed.' }, { status: 400 });
  }
}
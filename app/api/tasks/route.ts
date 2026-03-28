import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newTask = await prisma.task.create({
    data: { title: data.title },
  });
  return NextResponse.json(newTask);
}
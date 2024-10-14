import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const positions = await prisma.jabatan.findMany();
    return NextResponse.json(positions);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

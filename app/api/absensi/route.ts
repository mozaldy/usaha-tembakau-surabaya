import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const absentions = await prisma.absensi.findMany();
    return NextResponse.json(absentions);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const salaries = await prisma.gaji.findMany();
    return NextResponse.json(salaries);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

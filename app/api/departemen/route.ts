import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const nama = searchParams.get("nama");

  if (id) {
    try {
      const departments = await prisma.departemen.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!departments) {
        return NextResponse.json(
          { error: "Departemen tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(departments);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else if (nama) {
    try {
      const departments = await prisma.departemen.findMany({
        where: {
          namaDepartemen: {
            contains: nama,
          },
        },
      });
      if (!departments) {
        return NextResponse.json(
          { error: "Departemen tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(departments);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    try {
      const departments = await prisma.departemen.findMany();
      return NextResponse.json(departments);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const nama = searchParams.get("nama");

  if (!nama) {
    return NextResponse.json(
      { error: "Nama departemen harus diisi" },
      { status: 400 },
    );
  }

  try {
    const department = await prisma.departemen.create({
      data: {
        namaDepartemen: nama,
      },
    });
    return NextResponse.json(department);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID departemen harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id);

  try {
    const department = await prisma.departemen.delete({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json(department);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const nama = searchParams.get("nama");

  if (!id || !nama) {
    return NextResponse.json(
      { error: "ID dan nama departemen harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id, 10);

  try {
    const department = await prisma.departemen.update({
      where: { id: parsedId },
      data: { namaDepartemen: nama },
    });
    return NextResponse.json(department);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

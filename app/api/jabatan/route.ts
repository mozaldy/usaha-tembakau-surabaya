import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const nama = searchParams.get("nama");

  if (id) {
    try {
      const jabatan = await prisma.jabatan.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!jabatan) {
        return NextResponse.json(
          { error: "Jabatan tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(jabatan);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else if (nama) {
    try {
      const jabatans = await prisma.jabatan.findMany({
        where: {
          namaJabatan: {
            contains: nama,
          },
        },
      });
      if (jabatans.length === 0) {
        return NextResponse.json(
          { error: "Jabatan tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(jabatans);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    try {
      const jabatans = await prisma.jabatan.findMany();
      return NextResponse.json(jabatans);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { namaJabatan } = body;

  if (!namaJabatan) {
    return NextResponse.json(
      { error: "Nama jabatan harus diisi" },
      { status: 400 },
    );
  }

  try {
    const jabatan = await prisma.jabatan.create({
      data: {
        namaJabatan,
      },
    });
    return NextResponse.json(jabatan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID jabatan harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id);

  try {
    const jabatan = await prisma.jabatan.delete({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json(jabatan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json();
  const { namaJabatan } = body;

  if (!id || !namaJabatan) {
    return NextResponse.json(
      { error: "ID dan nama jabatan harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id, 10);

  try {
    const jabatan = await prisma.jabatan.update({
      where: { id: parsedId },
      data: { namaJabatan },
    });
    return NextResponse.json(jabatan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

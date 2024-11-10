import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatusAbsensi } from "@prisma/client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const karyawanId = searchParams.get("karyawanId");
  const tanggal = searchParams.get("tanggal");

  if (id) {
    try {
      const absensi = await prisma.absensi.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!absensi) {
        return NextResponse.json(
          { error: "Absensi tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(absensi);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else if (karyawanId && tanggal) {
    try {
      const absensi = await prisma.absensi.findFirst({
        where: {
          karyawanId: parseInt(karyawanId),
          tanggal: new Date(tanggal),
        },
      });
      if (!absensi) {
        return NextResponse.json(
          { error: "Absensi tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(absensi);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    try {
      const absensis = await prisma.absensi.findMany();
      return NextResponse.json(absensis);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const karyawanId = searchParams.get("karyawanId");
  const statusAbsensi = searchParams.get("statusAbsensi");

  if (!karyawanId || !statusAbsensi) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(karyawanId);
  try {
    const sudahAbsen = await prisma.absensi.findFirst({
      where: {
        karyawanId: parsedId,
        tanggal: new Date(),
      },
    });

    if (sudahAbsen) {
      return NextResponse.json("Anda sudah absen masuk!");
    }

    const absensi = await prisma.absensi.create({
      data: {
        karyawanId: parsedId,
        tanggal: new Date(),
        statusAbsensi:
          StatusAbsensi[statusAbsensi as keyof typeof StatusAbsensi],
      },
    });
    return NextResponse.json(absensi);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID absensi harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id);

  try {
    const absensi = await prisma.absensi.delete({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json(absensi);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const karyawanId = searchParams.get("karyawanId");
  const statusAbsensi = searchParams.get("statusAbsensi");

  if (!karyawanId || !statusAbsensi) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(karyawanId, 10);

  try {
    const absensi = await prisma.absensi.update({
      where: { id: parsedId },
      data: {
        statusAbsensi:
          StatusAbsensi[statusAbsensi as keyof typeof StatusAbsensi],
      },
    });
    return NextResponse.json(absensi);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

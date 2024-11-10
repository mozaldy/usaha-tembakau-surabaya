import { prisma } from "@/lib/prisma";
import { StatusKaryawan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const nama = searchParams.get("nama");

  if (id) {
    try {
      const karyawan = await prisma.karyawan.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!karyawan) {
        return NextResponse.json(
          { error: "Karyawan tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(karyawan);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else if (nama) {
    try {
      const karyawans = await prisma.karyawan.findMany({
        where: {
          namaLengkap: {
            contains: nama,
          },
        },
      });
      if (karyawans.length === 0) {
        return NextResponse.json(
          { error: "Karyawan tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(karyawans);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    try {
      const karyawans = await prisma.karyawan.findMany();
      return NextResponse.json(karyawans);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const namaLengkap = searchParams.get("namaLengkap");
  const email = searchParams.get("email");
  const nomorTelepon = searchParams.get("nomorTelepon");
  const tanggalLahir = searchParams.get("tanggalLahir");
  const alamat = searchParams.get("alamat");
  const tanggalMasuk = searchParams.get("tanggalMasuk");
  const departemenId = searchParams.get("departemenId");
  const jabatanId = searchParams.get("jabatanId");
  const status = searchParams.get("status");

  if (
    !namaLengkap ||
    !email ||
    !nomorTelepon ||
    !tanggalLahir ||
    !alamat ||
    !tanggalMasuk ||
    !departemenId ||
    !jabatanId ||
    !status
  ) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 },
    );
  }

  try {
    const karyawan = await prisma.karyawan.create({
      data: {
        namaLengkap,
        email,
        nomorTelepon,
        tanggalLahir: new Date(tanggalLahir),
        alamat,
        tanggalMasuk: new Date(tanggalMasuk),
        departemenId: parseInt(departemenId),
        jabatanId: parseInt(jabatanId),
        status: StatusKaryawan[status as keyof typeof StatusKaryawan],
      },
    });
    return NextResponse.json(karyawan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID karyawan harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id);

  try {
    const karyawan = await prisma.karyawan.delete({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json(karyawan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID karyawan harus diisi" },
      { status: 400 },
    );
  }

  const parsedId = parseInt(id, 10);

  try {
    const karyawan = await prisma.karyawan.update({
      where: { id: parsedId },
      data: body,
    });
    return NextResponse.json(karyawan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

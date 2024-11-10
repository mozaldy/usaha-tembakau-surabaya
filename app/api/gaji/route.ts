import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const karyawanId = searchParams.get("karyawanId");
  const bulan = searchParams.get("bulan");

  if (id) {
    try {
      const gaji = await prisma.gaji.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!gaji) {
        return NextResponse.json(
          { error: "Gaji tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(gaji);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else if (karyawanId && bulan) {
    try {
      const gaji = await prisma.gaji.findFirst({
        where: {
          karyawanId: parseInt(karyawanId),
          bulan: bulan,
        },
      });
      if (!gaji) {
        return NextResponse.json(
          { error: "Gaji tidak ditemukan" },
          { status: 404 },
        );
      }
      return NextResponse.json(gaji);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    try {
      const gajis = await prisma.gaji.findMany();
      return NextResponse.json(gajis);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { karyawanId, bulan, gajiPokok, tunjangan, potongan } = body;

  if (!karyawanId || !bulan || !gajiPokok || !tunjangan || !potongan) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 },
    );
  }

  const totalGaji =
    parseFloat(gajiPokok) + parseFloat(tunjangan) - parseFloat(potongan);

  try {
    const gaji = await prisma.gaji.create({
      data: {
        karyawanId: parseInt(karyawanId),
        bulan,
        gajiPokok: parseFloat(gajiPokok),
        tunjangan: parseFloat(tunjangan),
        potongan: parseFloat(potongan),
        totalGaji,
      },
    });
    return NextResponse.json(gaji);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID gaji harus diisi" }, { status: 400 });
  }

  const parsedId = parseInt(id);

  try {
    const gaji = await prisma.gaji.delete({
      where: {
        id: parsedId,
      },
    });
    return NextResponse.json(gaji);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID gaji harus diisi" }, { status: 400 });
  }

  const parsedId = parseInt(id, 10);

  if (body.gajiPokok || body.tunjangan || body.potongan) {
    const currentGaji = await prisma.gaji.findUnique({
      where: { id: parsedId },
    });

    if (!currentGaji) {
      return NextResponse.json(
        { error: "Gaji tidak ditemukan" },
        { status: 404 },
      );
    }

    const gajiPokok = body.gajiPokok
      ? parseFloat(body.gajiPokok)
      : parseFloat(currentGaji.gajiPokok.toString());
    const tunjangan = body.tunjangan
      ? parseFloat(body.tunjangan)
      : parseFloat(currentGaji.tunjangan.toString());
    const potongan = body.potongan
      ? parseFloat(body.potongan)
      : parseFloat(currentGaji.potongan.toString());

    body.totalGaji = gajiPokok + tunjangan - potongan;
  }

  try {
    const gaji = await prisma.gaji.update({
      where: { id: parsedId },
      data: body,
    });
    return NextResponse.json(gaji);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

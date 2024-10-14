import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const departemenHR = await prisma.departemen.create({
    data: { namaDepartemen: "Human Resources" },
  });
  const departemenIT = await prisma.departemen.create({
    data: { namaDepartemen: "Information Technology" },
  });

  const jabatanManager = await prisma.jabatan.create({
    data: { namaJabatan: "Manager" },
  });
  const jabatanStaff = await prisma.jabatan.create({
    data: { namaJabatan: "Staff" },
  });

  const karyawan1 = await prisma.karyawan.create({
    data: {
      namaLengkap: "Muhammad Rafi Rizaldi",
      email: "mrrizz@robot.com",
      nomorTelepon: "081234567890",
      tanggalLahir: new Date("2006-03-01"),
      alamat: "Jl. Robotika No. 1, Surabaya",
      tanggalMasuk: new Date("2024-03-01"),
      departemenId: departemenHR.id,
      jabatanId: jabatanManager.id,
      status: "aktif",
    },
  });

  const karyawan2 = await prisma.karyawan.create({
    data: {
      namaLengkap: "Muhammad Raihan Ghani",
      email: "gani_gymbro@gmail.com",
      nomorTelepon: "082345678901",
      tanggalLahir: new Date("1945-05-20"),
      alamat: "Jl. Keputih No. 45, Surabaya",
      tanggalMasuk: new Date("2021-06-15"),
      departemenId: departemenIT.id,
      jabatanId: jabatanStaff.id,
      status: "aktif",
    },
  });

  await prisma.absensi.createMany({
    data: [
      {
        karyawanId: karyawan1.id,
        tanggal: new Date("2024-03-01"),
        waktuMasuk: new Date("2024-03-01T08:00:00"),
        waktuKeluar: new Date("2024-03-01T17:00:00"),
        statusAbsensi: "hadir",
      },
      {
        karyawanId: karyawan2.id,
        tanggal: new Date("2024-03-01"),
        waktuMasuk: new Date("2024-03-01T08:30:00"),
        waktuKeluar: new Date("2024-03-01T17:30:00"),
        statusAbsensi: "hadir",
      },
    ],
  });

  await prisma.gaji.createMany({
    data: [
      {
        karyawanId: karyawan1.id,
        bulan: "2024-03",
        gajiPokok: 5000000,
        tunjangan: 1000000,
        potongan: 200000,
        totalGaji: 5800000,
      },
      {
        karyawanId: karyawan2.id,
        bulan: "2024-03",
        gajiPokok: 4000000,
        tunjangan: 800000,
        potongan: 150000,
        totalGaji: 4650000,
      },
    ],
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

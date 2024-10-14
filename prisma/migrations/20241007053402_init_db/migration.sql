-- CreateEnum
CREATE TYPE "StatusKaryawan" AS ENUM ('aktif', 'nonaktif');

-- CreateEnum
CREATE TYPE "StatusAbsensi" AS ENUM ('hadir', 'izin', 'sakit', 'alpha');

-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "namaLengkap" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "nomorTelepon" VARCHAR(15) NOT NULL,
    "tanggalLahir" DATE NOT NULL,
    "alamat" TEXT NOT NULL,
    "tanggalMasuk" DATE NOT NULL,
    "departemenId" INTEGER NOT NULL,
    "jabatanId" INTEGER NOT NULL,
    "status" "StatusKaryawan" NOT NULL,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departemen" (
    "id" SERIAL NOT NULL,
    "namaDepartemen" VARCHAR(100) NOT NULL,

    CONSTRAINT "Departemen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jabatan" (
    "id" SERIAL NOT NULL,
    "namaJabatan" VARCHAR(100) NOT NULL,

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "tanggal" DATE NOT NULL,
    "waktuMasuk" TIME NOT NULL,
    "waktuKeluar" TIME NOT NULL,
    "statusAbsensi" "StatusAbsensi" NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gaji" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "bulan" VARCHAR(10) NOT NULL,
    "gajiPokok" DECIMAL(10,2) NOT NULL,
    "tunjangan" DECIMAL(10,2) NOT NULL,
    "potongan" DECIMAL(10,2) NOT NULL,
    "totalGaji" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Gaji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_email_key" ON "Karyawan"("email");

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_departemenId_fkey" FOREIGN KEY ("departemenId") REFERENCES "Departemen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_jabatanId_fkey" FOREIGN KEY ("jabatanId") REFERENCES "Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gaji" ADD CONSTRAINT "Gaji_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

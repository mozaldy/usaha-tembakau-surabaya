/*
  Warnings:

  - The `waktuMasuk` column on the `Absensi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waktuKeluar` column on the `Absensi` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "waktuMasuk",
ADD COLUMN     "waktuMasuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "waktuKeluar",
ADD COLUMN     "waktuKeluar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

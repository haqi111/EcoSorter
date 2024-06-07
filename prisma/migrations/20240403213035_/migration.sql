-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataTps" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupatenKota" TEXT NOT NULL,
    "namaFasilitas" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "sampahMasuk" DOUBLE PRECISION NOT NULL,
    "sampahMasukLandfill" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DataTps_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - The `estado` column on the `entrega` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "estado" AS ENUM ('pendiente', 'recibido', 'no_recibido');

-- CreateEnum
CREATE TYPE "departamento" AS ENUM ('pediatria', 'traumatologia', 'dermatologia', 'oncologia');

-- AlterTable
ALTER TABLE "entrega" DROP COLUMN "estado",
ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'pendiente';

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departamento" "departamento" NOT NULL DEFAULT 'pediatria',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

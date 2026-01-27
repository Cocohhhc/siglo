/*
  Warnings:

  - You are about to drop the column `paciente_id` on the `entrega` table. All the data in the column will be lost.
  - You are about to drop the column `Edad` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `IdNumber` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_de_nacimiento` on the `pacientes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idNumber]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `edad` to the `pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaDeNacimiento` to the `pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNumber` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entrega" DROP CONSTRAINT "entrega_paciente_id_fkey";

-- DropIndex
DROP INDEX "pacientes_IdNumber_key";

-- AlterTable
ALTER TABLE "entrega" DROP COLUMN "paciente_id",
ADD COLUMN     "pacientesId" INTEGER;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "Edad",
DROP COLUMN "IdNumber",
DROP COLUMN "fecha_de_nacimiento",
ADD COLUMN     "edad" INTEGER NOT NULL,
ADD COLUMN     "fechaDeNacimiento" TEXT NOT NULL,
ADD COLUMN     "idNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_idNumber_key" ON "pacientes"("idNumber");

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_pacientesId_fkey" FOREIGN KEY ("pacientesId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `contenido` on the `entrega` table. All the data in the column will be lost.
  - Added the required column `registro_id` to the `entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entrega" DROP COLUMN "contenido",
ADD COLUMN     "registro_id" INTEGER NOT NULL;

-- AlterTable
CREATE SEQUENCE registro_secuencia_seq;
ALTER TABLE "registro" ALTER COLUMN "secuencia" SET DEFAULT nextval('registro_secuencia_seq');
ALTER SEQUENCE registro_secuencia_seq OWNED BY "registro"."secuencia";

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_registro_id_fkey" FOREIGN KEY ("registro_id") REFERENCES "registro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `descripcion` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `diagnostico` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `tratamiento` on the `registro` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `registro` table. All the data in the column will be lost.
  - Added the required column `departamento_id` to the `registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secuencia` to the `registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro" DROP COLUMN "descripcion",
DROP COLUMN "diagnostico",
DROP COLUMN "fecha",
DROP COLUMN "tratamiento",
DROP COLUMN "user_id",
ADD COLUMN     "departamento_id" INTEGER NOT NULL,
ADD COLUMN     "secuencia" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "registro" ADD CONSTRAINT "registro_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

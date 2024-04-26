/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to drop the `cursuri` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `didactic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prieteni` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profesori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studenti` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "didactic" DROP CONSTRAINT "fk_didactic_id_curs";

-- DropForeignKey
ALTER TABLE "didactic" DROP CONSTRAINT "fk_didactic_id_profesor";

-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "fk_note_id_curs";

-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "fk_note_id_student";

-- DropForeignKey
ALTER TABLE "prieteni" DROP CONSTRAINT "fk_prieteni_id_student1";

-- DropForeignKey
ALTER TABLE "prieteni" DROP CONSTRAINT "fk_prieteni_id_student2";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "age",
DROP COLUMN "created_at",
DROP COLUMN "id",
ADD COLUMN     "password" VARCHAR(21) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "cursuri";

-- DropTable
DROP TABLE "didactic";

-- DropTable
DROP TABLE "note";

-- DropTable
DROP TABLE "prieteni";

-- DropTable
DROP TABLE "profesori";

-- DropTable
DROP TABLE "studenti";

-- DropTable
DROP TABLE "test";

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

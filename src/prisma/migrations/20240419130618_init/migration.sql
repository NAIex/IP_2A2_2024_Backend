/*
  Warnings:

  - You are about to alter the column `random_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "random_name" SET DATA TYPE VARCHAR(50);

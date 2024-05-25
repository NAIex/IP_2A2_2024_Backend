/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `community` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `warnings_count` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "warnings_count" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "community";

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityUser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL,

    CONSTRAINT "CommunityUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityUser_user_id_community_id_key" ON "CommunityUser"("user_id", "community_id");

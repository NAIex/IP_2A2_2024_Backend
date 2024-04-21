/*
  Warnings:

  - The primary key for the `community` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
CREATE SEQUENCE community_id_seq;
ALTER TABLE "community" DROP CONSTRAINT "community_pkey",
ALTER COLUMN "id" SET DEFAULT nextval('community_id_seq'),
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "community_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE community_id_seq OWNED BY "community"."id";

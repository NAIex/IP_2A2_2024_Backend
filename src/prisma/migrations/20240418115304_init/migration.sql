-- CreateTable
CREATE TABLE "community" (
    "id" SMALLINT NOT NULL,
    "titlu" VARCHAR(52) NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "community_pkey" PRIMARY KEY ("id")
);

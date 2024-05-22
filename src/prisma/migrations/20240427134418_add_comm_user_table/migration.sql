-- CreateTable
CREATE TABLE "CommunityUser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL,

    CONSTRAINT "CommunityUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityUser_user_id_community_id_key" ON "CommunityUser"("user_id", "community_id");

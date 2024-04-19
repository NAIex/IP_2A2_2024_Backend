-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "user_type" SET DEFAULT 'admin';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_type" SET DEFAULT 'user',
ALTER COLUMN "ban_status" DROP NOT NULL,
ALTER COLUMN "unbanned_date" DROP NOT NULL,
ALTER COLUMN "unmute_date" DROP NOT NULL,
ALTER COLUMN "random_name" DROP NOT NULL;

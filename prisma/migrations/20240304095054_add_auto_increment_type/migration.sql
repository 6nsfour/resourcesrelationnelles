/*
  Warnings:

  - Made the column `file` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "file" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "value" SET DEFAULT 'not_connected';

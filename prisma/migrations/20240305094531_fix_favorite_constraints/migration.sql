/*
  Warnings:

  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
ALTER COLUMN "resource_id" DROP DEFAULT,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("user_id", "resource_id");
DROP SEQUENCE "Favorite_resource_id_seq";

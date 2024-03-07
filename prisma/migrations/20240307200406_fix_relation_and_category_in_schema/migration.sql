/*
  Warnings:

  - The primary key for the `CategoryFilter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CategoryFilter` table. All the data in the column will be lost.
  - The primary key for the `RelationFilter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RelationFilter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoryFilter" DROP CONSTRAINT "CategoryFilter_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CategoryFilter_pkey" PRIMARY KEY ("category_id", "resource_id");

-- AlterTable
ALTER TABLE "RelationFilter" DROP CONSTRAINT "RelationFilter_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RelationFilter_pkey" PRIMARY KEY ("relation_id", "resource_id");

/*
  Warnings:

  - You are about to drop the `CategoryFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryFilter" DROP CONSTRAINT "CategoryFilter_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoryFilter" DROP CONSTRAINT "CategoryFilter_resource_id_fkey";

-- DropTable
DROP TABLE "CategoryFilter";

-- CreateTable
CREATE TABLE "ResourceCategory" (
    "resource_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "ResourceCategory_pkey" PRIMARY KEY ("category_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "ResourceCategory" ADD CONSTRAINT "ResourceCategory_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCategory" ADD CONSTRAINT "ResourceCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

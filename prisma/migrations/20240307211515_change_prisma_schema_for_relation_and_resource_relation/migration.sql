/*
  Warnings:

  - You are about to drop the `RelationFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RelationFilter" DROP CONSTRAINT "RelationFilter_relation_id_fkey";

-- DropForeignKey
ALTER TABLE "RelationFilter" DROP CONSTRAINT "RelationFilter_resource_id_fkey";

-- DropTable
DROP TABLE "RelationFilter";

-- CreateTable
CREATE TABLE "ResourceRelation" (
    "resource_id" INTEGER NOT NULL,
    "relation_id" INTEGER NOT NULL,

    CONSTRAINT "ResourceRelation_pkey" PRIMARY KEY ("relation_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_relation_id_fkey" FOREIGN KEY ("relation_id") REFERENCES "Relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

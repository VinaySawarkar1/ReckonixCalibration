-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "CompanyEvent" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

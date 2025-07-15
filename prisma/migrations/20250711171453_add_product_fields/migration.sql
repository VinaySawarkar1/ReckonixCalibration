-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "applications" TEXT,
ADD COLUMN     "catalogPdfUrl" TEXT,
ADD COLUMN     "certifications" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "datasheetPdfUrl" TEXT,
ADD COLUMN     "featuresBenefits" TEXT,
ADD COLUMN     "fullTechnicalInfo" TEXT,
ADD COLUMN     "homeFeatured" BOOLEAN DEFAULT false,
ADD COLUMN     "imageGallery" TEXT,
ADD COLUMN     "specifications" TEXT,
ADD COLUMN     "technicalDetails" TEXT,
ADD COLUMN     "views" INTEGER DEFAULT 0;

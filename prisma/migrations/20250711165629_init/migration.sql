-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "shortDescription" TEXT,
    "imageUrl" TEXT,
    "rank" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subcategories" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "category" TEXT,
    "description" TEXT,
    "website" TEXT,
    "industry" TEXT,
    "featured" BOOLEAN DEFAULT false,
    "location" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

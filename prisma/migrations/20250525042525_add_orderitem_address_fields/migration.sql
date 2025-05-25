/*
  Warnings:

  - Added the required column `city` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalcode` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "addressType" TEXT,
ADD COLUMN     "apartmentSuite" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalcode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL;

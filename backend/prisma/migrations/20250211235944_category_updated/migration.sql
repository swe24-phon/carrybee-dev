/*
  Warnings:

  - The values [OTHER] on the enum `ParcelCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ParcelCategory_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');
ALTER TABLE "Parcel" ALTER COLUMN "category" TYPE "ParcelCategory_new" USING ("category"::text::"ParcelCategory_new");
ALTER TYPE "ParcelCategory" RENAME TO "ParcelCategory_old";
ALTER TYPE "ParcelCategory_new" RENAME TO "ParcelCategory";
DROP TYPE "ParcelCategory_old";
COMMIT;

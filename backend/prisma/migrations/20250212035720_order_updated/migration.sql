/*
  Warnings:

  - You are about to drop the column `dropoff_latitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dropoff_longitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_latitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_longitude` on the `Order` table. All the data in the column will be lost.
  - Added the required column `dropoff_lat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoff_lon` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_lat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_lon` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dropoff_latitude",
DROP COLUMN "dropoff_longitude",
DROP COLUMN "pickup_latitude",
DROP COLUMN "pickup_longitude",
ADD COLUMN     "dropoff_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dropoff_lon" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickup_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickup_lon" DOUBLE PRECISION NOT NULL;

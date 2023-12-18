/*
  Warnings:

  - The primary key for the `QRCode` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_pkey",
ALTER COLUMN "qrhash" DROP DEFAULT,
ALTER COLUMN "qrhash" SET DATA TYPE TEXT,
ADD CONSTRAINT "QRCode_pkey" PRIMARY KEY ("qrhash");
DROP SEQUENCE "QRCode_qrhash_seq";

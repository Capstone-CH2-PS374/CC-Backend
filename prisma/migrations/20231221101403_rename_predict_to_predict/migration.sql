/*
  Warnings:

  - You are about to drop the `predict` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "predict" DROP CONSTRAINT "predict_user_id_fkey";

-- DropTable
DROP TABLE "predict";

-- CreateTable
CREATE TABLE "Predict" (
    "user_id" TEXT NOT NULL,
    "prediction" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Predict_user_id_key" ON "Predict"("user_id");

-- AddForeignKey
ALTER TABLE "Predict" ADD CONSTRAINT "Predict_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

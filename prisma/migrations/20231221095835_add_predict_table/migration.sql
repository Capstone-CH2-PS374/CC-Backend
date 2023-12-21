-- CreateTable
CREATE TABLE "predict" (
    "user_id" TEXT NOT NULL,
    "prediction" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "predict_user_id_key" ON "predict"("user_id");

-- AddForeignKey
ALTER TABLE "predict" ADD CONSTRAINT "predict_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Organization');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserData" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "jobs" TEXT NOT NULL,
    "highest_edu" TEXT NOT NULL,
    "type_organization" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "volunteerId" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("volunteerId")
);

-- CreateTable
CREATE TABLE "QRCode" (
    "qrhash" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("qrhash")
);

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_user_id_key" ON "Volunteer"("user_id");

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

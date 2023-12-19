-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserData" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "birth_date" DROP NOT NULL,
ALTER COLUMN "jobs" DROP NOT NULL,
ALTER COLUMN "highest_edu" DROP NOT NULL,
ALTER COLUMN "type_organization" DROP NOT NULL,
ALTER COLUMN "interest" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "status" DROP NOT NULL;

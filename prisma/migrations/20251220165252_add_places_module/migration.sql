-- CreateEnum
CREATE TYPE "place_type" AS ENUM ('cafe', 'restaurant', 'other');

-- CreateEnum
CREATE TYPE "place_status" AS ENUM ('pending', 'rejected', 'active');

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "place_type" NOT NULL,
    "description" TEXT,
    "owner_email" TEXT,
    "status" "place_status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "account_id" INTEGER,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_status_idx" ON "Place"("status");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `address` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `owner_email` on the `Place` table. All the data in the column will be lost.
  - Made the column `account_id` on table `Place` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_account_id_fkey";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "address",
DROP COLUMN "owner_email",
ALTER COLUMN "account_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

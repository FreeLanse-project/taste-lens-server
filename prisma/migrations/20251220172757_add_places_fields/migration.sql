-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "address" TEXT,
ADD COLUMN     "budget" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- DropIndex
DROP INDEX "Franchise_cnpj_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "franchiseId" TEXT;

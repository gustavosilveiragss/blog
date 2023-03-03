/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guid]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guid]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `guid` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `guid` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `guid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "guid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "categoryId",
ADD COLUMN     "authorGuid" TEXT,
ADD COLUMN     "categoryGuid" TEXT,
ADD COLUMN     "guid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "guid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_guid_key" ON "Category"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Post_guid_key" ON "Post"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "User_guid_key" ON "User"("guid");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorGuid_fkey" FOREIGN KEY ("authorGuid") REFERENCES "User"("guid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryGuid_fkey" FOREIGN KEY ("categoryGuid") REFERENCES "Category"("guid") ON DELETE SET NULL ON UPDATE CASCADE;

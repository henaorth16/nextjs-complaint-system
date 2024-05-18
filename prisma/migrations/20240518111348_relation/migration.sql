/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `Complaint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `complaint` ADD COLUMN `departmentId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Complaint_departmentId_key` ON `Complaint`(`departmentId`);

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

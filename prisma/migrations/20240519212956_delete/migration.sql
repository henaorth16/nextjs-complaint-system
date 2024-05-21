/*
  Warnings:

  - You are about to drop the `complaint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `complaint` DROP FOREIGN KEY `Complaint_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_departmentId_fkey`;

-- DropTable
DROP TABLE `complaint`;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `users`;

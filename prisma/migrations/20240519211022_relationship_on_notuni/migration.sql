/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_departmentId_key` ON `Users`(`departmentId`);

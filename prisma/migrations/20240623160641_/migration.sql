/*
  Warnings:

  - You are about to drop the column `descripton` on the `Event` table. All the data in the column will be lost.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `descripton`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

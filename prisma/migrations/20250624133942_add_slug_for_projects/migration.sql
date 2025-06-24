/*
  Warnings:

  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `slug` VARCHAR(100) NULL;
UPDATE `Project`
  SET slug = REPLACE(LOWER(name), ' ', '-');
ALTER TABLE `Project` MODIFY `slug` VARCHAR(100) NOT NULL;

/*
  Warnings:

  - Added the required column `shortDescription` to the `Project` table without
    a default value. This is not possible if the table is not empty.

*/
ALTER TABLE `Project` ADD `shortDescription` VARCHAR(200) NULL;

UPDATE `Project` SET `shortDescription` = SUBSTRING(`description`,1,200);

ALTER TABLE `Project` MODIFY `shortDescription` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Project`
ADD `repoUrl` VARCHAR(191) NULL,
MODIFY `description` TEXT NULL;

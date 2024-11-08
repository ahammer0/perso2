/*
  Warnings:

  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublished` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_name_key` ON `User`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `title`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `pictureId` INTEGER NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileName` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `type` ENUM('picture', 'icon', 'profile') NOT NULL DEFAULT 'picture',

    UNIQUE INDEX `Media_fileName_key`(`fileName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Techno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pictureId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isPublished` BOOLEAN NOT NULL,

    UNIQUE INDEX `Techno_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToTechno` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectToTechno_AB_unique`(`A`, `B`),
    INDEX `_ProjectToTechno_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Techno` ADD CONSTRAINT `Techno_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTechno` ADD CONSTRAINT `_ProjectToTechno_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTechno` ADD CONSTRAINT `_ProjectToTechno_B_fkey` FOREIGN KEY (`B`) REFERENCES `Techno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

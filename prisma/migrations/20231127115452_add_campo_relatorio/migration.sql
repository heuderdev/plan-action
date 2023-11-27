-- AlterTable
ALTER TABLE `publications` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedAtUser` VARCHAR(191) NULL;

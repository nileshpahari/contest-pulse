/*
  Warnings:

  - You are about to drop the column `endTime` on the `Contests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contests" DROP COLUMN "endTime";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL;

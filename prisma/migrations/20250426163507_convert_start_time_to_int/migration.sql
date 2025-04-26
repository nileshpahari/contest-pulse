/*
  Warnings:

  - Changed the type of `startTime` on the `Contests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contests" DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER NOT NULL;

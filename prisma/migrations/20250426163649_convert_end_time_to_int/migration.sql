/*
  Warnings:

  - Added the required column `endTime` to the `Contests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contests" ADD COLUMN     "endTime" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the `Contests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserContest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserContest" DROP CONSTRAINT "UserContest_site_title_fkey";

-- DropForeignKey
ALTER TABLE "UserContest" DROP CONSTRAINT "UserContest_userId_fkey";

-- DropTable
DROP TABLE "Contests";

-- DropTable
DROP TABLE "UserContest";

-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserSavedContests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserSavedContests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserSavedContests_B_index" ON "_UserSavedContests"("B");

-- AddForeignKey
ALTER TABLE "_UserSavedContests" ADD CONSTRAINT "_UserSavedContests_A_fkey" FOREIGN KEY ("A") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedContests" ADD CONSTRAINT "_UserSavedContests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

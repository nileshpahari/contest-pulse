/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contest_url_key" ON "Contest"("url");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contests" (
    "title" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Contests_pkey" PRIMARY KEY ("site","title")
);

-- CreateTable
CREATE TABLE "UserContest" (
    "userId" INTEGER NOT NULL,
    "site" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "UserContest_pkey" PRIMARY KEY ("userId","site","title")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserContest" ADD CONSTRAINT "UserContest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContest" ADD CONSTRAINT "UserContest_site_title_fkey" FOREIGN KEY ("site", "title") REFERENCES "Contests"("site", "title") ON DELETE RESTRICT ON UPDATE CASCADE;

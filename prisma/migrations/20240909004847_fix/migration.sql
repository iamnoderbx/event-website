/*
  Warnings:

  - A unique constraint covering the columns `[discord]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_discord_key" ON "User"("discord");

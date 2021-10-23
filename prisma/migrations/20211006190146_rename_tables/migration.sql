/*
  Warnings:

  - You are about to drop the `FollowRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'Dev', 'ADMIN');

-- DropForeignKey
ALTER TABLE "FollowRelation" DROP CONSTRAINT "FollowRelation_fromId_fkey";

-- DropForeignKey
ALTER TABLE "FollowRelation" DROP CONSTRAINT "FollowRelation_toId_fkey";

-- DropTable
DROP TABLE "FollowRelation";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "picture" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow_relation" (
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_relation_pkey" PRIMARY KEY ("fromId","toId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "follow_relation" ADD CONSTRAINT "follow_relation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_relation" ADD CONSTRAINT "follow_relation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

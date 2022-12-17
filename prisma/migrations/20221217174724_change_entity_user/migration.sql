/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userID_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "admin",
ALTER COLUMN "userID" DROP DEFAULT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");
DROP SEQUENCE "User_userID_seq";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

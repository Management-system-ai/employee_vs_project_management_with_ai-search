/*
  Warnings:

  - You are about to drop the column `position` on the `Employees` table. All the data in the column will be lost.
  - You are about to drop the column `skillsId` on the `Phase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_skillsId_fkey";

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "position",
ADD COLUMN     "role" "EmployeeRole" NOT NULL DEFAULT 'DEVELOPER';

-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "skillsId";

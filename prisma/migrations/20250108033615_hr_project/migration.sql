/*
  Warnings:

  - You are about to drop the column `age` on the `Employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Domain" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EmployeeProjects" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "age",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Phase" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ProjectSkills" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Skills" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

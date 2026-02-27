/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `plan_end_time` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_start_time` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_end_time` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_start_time` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan_end_time" TIMESTAMP(0) NOT NULL,
ADD COLUMN     "plan_start_time" TIMESTAMP(0) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL,
ADD COLUMN     "work_end_time" TIMESTAMP(0) NOT NULL,
ADD COLUMN     "work_start_time" TIMESTAMP(0) NOT NULL;

/*
  Warnings:

  - Added the required column `limitation` to the `AvaliationData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvaliationData" ADD COLUMN     "limitation" TEXT NOT NULL;

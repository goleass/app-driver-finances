/*
  Warnings:

  - You are about to drop the column `categoty` on the `Movements` table. All the data in the column will be lost.
  - Added the required column `category` to the `Movements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movements" ("createdAt", "date", "description", "id", "type", "updatedAt", "userId") SELECT "createdAt", "date", "description", "id", "type", "updatedAt", "userId" FROM "Movements";
DROP TABLE "Movements";
ALTER TABLE "new_Movements" RENAME TO "Movements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

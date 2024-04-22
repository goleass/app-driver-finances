-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movements" ("category", "createdAt", "date", "description", "id", "type", "updatedAt", "userId") SELECT "category", "createdAt", "date", "description", "id", "type", "updatedAt", "userId" FROM "Movements";
DROP TABLE "Movements";
ALTER TABLE "new_Movements" RENAME TO "Movements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- Rename passwordHash column to password
ALTER TABLE "User" RENAME COLUMN "passwordHash" TO "password";


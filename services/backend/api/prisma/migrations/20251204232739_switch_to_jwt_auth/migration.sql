-- Switch from Clerk to JWT Auth
-- Add password field back
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Set a default password for existing users (they'll need to reset)
UPDATE "User" SET "password" = '$2a$10$defaulthashedpassword' WHERE "password" IS NULL;

-- Make password required
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- Drop clerkId column and its indexes
DROP INDEX IF EXISTS "User_clerkId_key";
DROP INDEX IF EXISTS "User_clerkId_idx";
ALTER TABLE "User" DROP COLUMN IF EXISTS "clerkId";


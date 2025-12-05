-- Add Clerk authentication fields to User table
-- Remove password field (Clerk handles authentication)
ALTER TABLE "User" DROP COLUMN IF EXISTS "password";

-- Add clerkId field (Clerk user ID)
ALTER TABLE "User" ADD COLUMN "clerkId" TEXT;

-- Add imageUrl field (profile picture from Clerk)
ALTER TABLE "User" ADD COLUMN "imageUrl" TEXT;

-- Make clerkId unique and not null (after adding column)
UPDATE "User" SET "clerkId" = 'temp_' || id::text WHERE "clerkId" IS NULL;
ALTER TABLE "User" ALTER COLUMN "clerkId" SET NOT NULL;

-- Create unique index on clerkId
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- Create index on clerkId for faster lookups
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");


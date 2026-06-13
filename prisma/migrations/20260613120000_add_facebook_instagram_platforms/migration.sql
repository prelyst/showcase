-- Add Facebook and Instagram as connectable platforms.
-- New enum values must be added outside a transaction block.
ALTER TYPE "Platform" ADD VALUE IF NOT EXISTS 'FACEBOOK';
ALTER TYPE "Platform" ADD VALUE IF NOT EXISTS 'INSTAGRAM';

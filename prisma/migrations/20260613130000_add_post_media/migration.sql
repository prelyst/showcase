-- Add optional media (image/video) to posts, required for Instagram publishing.
ALTER TABLE "Post"
ADD COLUMN "mediaUrl" TEXT,
ADD COLUMN "mediaType" TEXT;

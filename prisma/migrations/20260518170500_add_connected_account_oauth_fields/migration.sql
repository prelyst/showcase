ALTER TABLE "ConnectedAccount"
ADD COLUMN "externalId" TEXT,
ADD COLUMN "errorMessage" TEXT,
ADD COLUMN "scopes" TEXT[] DEFAULT ARRAY[]::TEXT[];

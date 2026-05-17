import { execSync } from 'node:child_process';

const shouldRun = process.env.SHOWCASE_SCHEMA_ONCE === 'true';

if (!shouldRun) {
  console.log('[schema-once] SHOWCASE_SCHEMA_ONCE is not true, skipping temporary schema deploy hook.');
  process.exit(0);
}

console.log('[schema-once] Running temporary prisma migrate deploy hook...');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });

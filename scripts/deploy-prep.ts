import { execSync } from 'node:child_process';

const dbEnabled = process.env.SHOWCASE_ENABLE_DB === 'true';

if (!dbEnabled) {
  console.log('[deploy-prep] SHOWCASE_ENABLE_DB is not true, skipping prisma deploy and seed.');
  process.exit(0);
}

console.log('[deploy-prep] Running prisma generate...');
execSync('npx prisma generate', { stdio: 'inherit' });

console.log('[deploy-prep] Running prisma migrate deploy...');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });

console.log('[deploy-prep] Running prisma seed...');
execSync('npx prisma db seed', { stdio: 'inherit' });

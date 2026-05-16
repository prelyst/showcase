import { DEMO_USER_ID } from '@/lib/constants/demo-user';

// Temporary Phase 3 bridge.
// Replace this with real Supabase Auth session resolution once auth wiring lands.
export async function getCurrentUserId() {
  return DEMO_USER_ID;
}

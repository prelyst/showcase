// Placeholder auth bridge for Phase 2.
// Final session wiring will depend on whether the app uses Supabase Auth helpers only,
// or a richer auth wrapper around them.

export async function getCurrentUserId() {
  return null as string | null;
}

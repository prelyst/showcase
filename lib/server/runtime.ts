export function isDatabaseEnabled() {
  return process.env.SHOWCASE_ENABLE_DB === 'true';
}

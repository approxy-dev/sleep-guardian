/** Joins conditional class names. Falsy entries are dropped. */
export function cn(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * Shortens an ISO timestamp to `HH:MM`.
 * Server and client can disagree on the locale/timezone, so the input is always
 * parsed as UTC and formatted in UTC, which keeps the rendered markup stable.
 */
export function formatClock(iso: string): string {
  const date = new Date(iso);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

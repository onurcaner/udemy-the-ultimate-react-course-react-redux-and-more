export function formatDay(dateString: string): string {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateString));
}

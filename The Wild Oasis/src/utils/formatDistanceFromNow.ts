import { formatDistance, parseISO } from 'date-fns';

export function formatDistanceFromNow(date: string): string {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');
}

import { differenceInDays, parseISO } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export function subtractDates(
  date1: Date | string,
  date2: Date | string,
): number {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

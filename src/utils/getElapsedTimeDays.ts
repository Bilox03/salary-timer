import dayjs from 'dayjs';

export function getElapsedTimeDays(previousPayday: dayjs.Dayjs): number {
  const now = dayjs();
  return now.diff(previousPayday, 'days', true);
}

import dayjs from 'dayjs';

export function getRemainingTimeDays(payday: dayjs.Dayjs): number {
  const now = dayjs();
  return payday.diff(now, 'days', true);
}

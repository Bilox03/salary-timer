import dayjs from 'dayjs';

export function getNextPayDate(paydayNumber: number): dayjs.Dayjs {
  const today = dayjs();
  let nextPayDate = today.date(paydayNumber);
  if (today.isAfter(nextPayDate)) {
    nextPayDate = today.add(1, 'month').date(paydayNumber);
  }
  return nextPayDate;
}

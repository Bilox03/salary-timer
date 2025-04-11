import dayjs from 'dayjs';

export function getPreviousPayDate(paydayNumber: number): dayjs.Dayjs {
  const today = dayjs();
  let previousPayDate = today.date(paydayNumber);
  if (today.isBefore(previousPayDate)) {
    previousPayDate = today.subtract(1, 'month').date(paydayNumber);
  }
  return previousPayDate;
}

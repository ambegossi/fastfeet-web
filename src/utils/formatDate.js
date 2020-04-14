import { utcToZonedTime, format } from 'date-fns-tz';

export default function formatDate(date) {
  if (!date) {
    return null;
  }

  const pattern = 'dd/MM/yyyy';
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(date, timeZone);
  const formattedDate = format(zonedDate, pattern);

  return formattedDate;
}

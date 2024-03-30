import { DateTime } from "luxon";

function useDateFormat(date) {
  const msgDate = DateTime.fromISO(date).toLocaleString();
  const timeStamp = DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);

  if (DateTime.fromISO(date).day === DateTime.now().day) {
    return `Today at ${timeStamp}`;
  } else if (
    DateTime.fromISO(date).day === DateTime.now().minus({ day: 1 }).day
  ) {
    return `Yesterday at ${timeStamp}`;
  }
  return `${msgDate} ${timeStamp}`;
}

export default useDateFormat;

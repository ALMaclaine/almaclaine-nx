import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';
const dateDifferenceToTimestamp = (date1: Date, date2: Date): number => {
  return date1.getTime() - date2.getTime();
};

const addDurationToDate = (date: Date, duration: Duration): Date => {
  return add(date, duration);
};

export { dateDifferenceToTimestamp, addDurationToDate, uuid };

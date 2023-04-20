import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';

const dateDifferenceToTimestamp = (date1: Date, date2: Date): number => {
  return date1.getTime() - date2.getTime();
};

const addDurationToDate = (date: Date, duration: Duration): Date => {
  return add(date, duration);
};

const addDurationToNow = (duration: Duration): Date => {
  return add(new Date(), duration);
};

const date0 = new Date(0);
const durationToTimestamp = (duration: Duration): number => {
  return add(date0, duration).getTime();
};

export {
  dateDifferenceToTimestamp,
  addDurationToDate,
  addDurationToNow,
  durationToTimestamp,
  uuid,
};

import type { Line } from './types';
import type { Option } from '@almaclaine/types';
import { ifTrueSome, none, some } from '@almaclaine/types';

type CalendarStartEnd = {
  indexStart: number;
  indexEnd: number;
};

const validateVCalendar = (lines: Line[]): Option<CalendarStartEnd> => {
  let indexStart = 0;
  while (lines[indexStart] === '') {
    indexStart++;
  }
  const firstValid = lines[indexStart] === 'BEGIN:VCALENDAR';

  let indexEnd = lines.length - 1;
  while (lines[indexEnd] === '') {
    indexEnd--;
  }
  const lastValid = lines[indexEnd] === 'END:VCALENDAR';

  const valid = firstValid && lastValid;
  return ifTrueSome(valid, { indexEnd, indexStart });
};

// const trimVCalendar =

const T_INDEX = 8;
const Z_INDEX = 15;
const LENGTH = 16;
const validateFormat = (date: string): boolean => {
  const d = date.split('');

  if (d.length !== LENGTH || d[T_INDEX] !== 'T' || d[Z_INDEX] !== 'Z') {
    return false;
  }

  return d
    .filter((x, i) => i !== T_INDEX && i !== Z_INDEX)
    .every((x) => !isNaN(parseInt(x)));
};

const iCalDateParser = (date: string): Option<Date> => {
  if (!validateFormat(date)) {
    return none();
  }

  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8));
  const hour = parseInt(date.slice(9, 11));
  const minute = parseInt(date.slice(11, 13));
  const second = parseInt(date.slice(13, 15));

  return some(new Date(Date.UTC(year, month, day, hour, minute, second)));
};

const match = (str: string, reg: RegExp): Option<string> => {
  const match = reg.exec(str);
  if (!match) {
    return none();
  }
  return some(match[1]);
};

const BEGIN_REGEX = /^BEGIN:(.*)/;
const testBegin = (str: string): boolean => BEGIN_REGEX.test(str);
const matchBegin = (str: string): Option<string> => {
  return match(str, BEGIN_REGEX);
};

const END_REGEX = /^END:(.*)/;
const testEnd = (str: string): boolean => END_REGEX.test(str);
const matchEnd = (str: string): Option<string> => {
  return match(str, END_REGEX);
};

const KEY_REGEX = /^([A-Z-]+)[:;](.*)/;
const testKey = (str: string): boolean => KEY_REGEX.test(str);
const matchKey = (str: string): Option<[string, string]> => {
  const match = KEY_REGEX.exec(str);
  if (!match) {
    return none();
  }
  return some([match[1], match[2]]);
};

export {
  validateVCalendar,
  validateFormat,
  iCalDateParser,
  testBegin,
  matchBegin,
  matchEnd,
  testEnd,
  testKey,
  matchKey,
};

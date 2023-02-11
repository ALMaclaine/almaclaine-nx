import type { Line } from './types';

type CalendarValidation =
  | {
      valid: true;
      indexStart: number;
      indexEnd: number;
    }
  | {
      valid: false;
      indexStart?: undefined;
      indexEnd?: undefined;
    };

const validateVCalendar = (lines: Line[]): CalendarValidation => {
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
  if (valid) {
    return {
      valid,
      indexEnd,
      indexStart,
    };
  } else {
    return { valid };
  }
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

const iCalDateParser = (date: string): Date => {
  if (!validateFormat(date)) {
    throw new Error('Not a valid iCal date format');
  }

  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8));
  const hour = parseInt(date.slice(9, 11));
  const minute = parseInt(date.slice(11, 13));
  const second = parseInt(date.slice(13, 15));

  return new Date(Date.UTC(year, month, day, hour, minute, second));
};

const BEGIN_REGEX = /^BEGIN:(.*)/;
const testBegin = (str: string): boolean => BEGIN_REGEX.test(str);
const matchBegin = (str: string): string => {
  const match = BEGIN_REGEX.exec(str);
  if (!match) {
    throw new Error('Match does not exist');
  }
  return match[1];
};

const END_REGEX = /^END:(.*)/;
const testEnd = (str: string): boolean => END_REGEX.test(str);
const matchEnd = (str: string): string => {
  const match = END_REGEX.exec(str);
  if (!match) {
    throw new Error('Match does not exist');
  }
  return match[1];
};

const KEY_REGEX = /^([A-Z-]+)[:;](.*)/;
const testKey = (str: string): boolean => KEY_REGEX.test(str);
const matchKey = (str: string): [string, string] => {
  const match = KEY_REGEX.exec(str);
  if (!match) {
    throw new Error('Match does not exist');
  }
  return [match[1], match[2]];
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

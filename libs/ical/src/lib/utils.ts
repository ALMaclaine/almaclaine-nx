import type { Line } from './types';

const validateVCalendar = (lines: Line[]) => {
  const firstValid = lines[0] === 'BEGIN:VCALENDAR';
  const lastValid = lines[lines.length - 1] === 'END:VCALENDAR';
  return firstValid && lastValid;
};

export { validateVCalendar };

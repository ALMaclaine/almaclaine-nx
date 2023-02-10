import { validateVCalendar } from './utils';

describe('utils', () => {
  describe('validateVCalendar', () => {
    it('should work', () => {
      expect(validateVCalendar(''.split('\n'))).toEqual(false);
      expect(validateVCalendar('words'.split('\n'))).toEqual(false);
      expect(validateVCalendar('words \n \n words'.split('\n'))).toEqual(false);
      expect(validateVCalendar('END:VCALENDAR'.split('\n'))).toEqual(false);
      expect(validateVCalendar('BEGIN:VCALENDAR'.split('\n'))).toEqual(false);
      expect(
        validateVCalendar('BEGIN:VCALENDAR\nEND:VCALENDAR'.split('\n'))
      ).toEqual(true);
      expect(
        validateVCalendar(
          'BEGIN:VCALENDAR\nwords words\n words words\nEND:VCALENDAR'.split(
            '\n'
          )
        )
      ).toEqual(true);
    });
  });
});

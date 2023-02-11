import {
  iCalDateParser,
  matchBegin,
  matchEnd,
  matchKey,
  testBegin,
  testEnd,
  testKey,
  validateFormat,
  validateVCalendar,
} from './utils';
import { getIcsFiles } from './test-utils';
import { expect } from 'vitest';

describe('utils', () => {
  describe('validateVCalendar', () => {
    it('should work', () => {
      expect(validateVCalendar(''.split('\n'))).toMatchObject({ valid: false });
      expect(validateVCalendar('words'.split('\n'))).toMatchObject({
        valid: false,
      });
      expect(validateVCalendar('words \n \n words'.split('\n'))).toMatchObject({
        valid: false,
      });
      expect(validateVCalendar('END:VCALENDAR'.split('\n'))).toMatchObject({
        valid: false,
      });
      expect(validateVCalendar('BEGIN:VCALENDAR'.split('\n'))).toMatchObject({
        valid: false,
      });

      expect(
        validateVCalendar('BEGIN:VCALENDAR\nEND:VCALENDAR'.split('\n'))
      ).toMatchObject({
        valid: true,
        indexStart: 0,
        indexEnd: 1,
      });

      expect(
        validateVCalendar(
          'BEGIN:VCALENDAR\nwords words\n words words\nEND:VCALENDAR'.split(
            '\n'
          )
        )
      ).toMatchObject({
        valid: true,
        indexStart: 0,
        indexEnd: 3,
      });

      expect(
        validateVCalendar(
          '\n\n\nBEGIN:VCALENDAR\nwords words\n words words\nEND:VCALENDAR\n\n\n\n'.split(
            '\n'
          )
        )
      ).toMatchObject({
        valid: true,
        indexStart: 3,
        indexEnd: 6,
      });

      const files = getIcsFiles();
      for (const file of files) {
        expect(validateVCalendar(file.split('\n')).valid).toEqual(true);
      }
    });
  });

  describe('validateFormat', () => {
    it('should work', () => {
      expect(validateFormat('20140422X233000Z')).toBeFalsy();
      expect(validateFormat('20140422T233000Y')).toBeFalsy();
      expect(validateFormat('20a40422T233000Z')).toBeFalsy();
      expect(validateFormat('1994-11-05T08:15:30-05:00')).toBeFalsy();
      expect(validateFormat('asdfgjfhgjkdfhsg')).toBeFalsy();
      expect(validateFormat('word')).toBeFalsy();

      expect(validateFormat('20140422T233000Z')).toBeTruthy();
      expect(validateFormat('20141203T012000Z')).toBeTruthy();
    });
  });

  describe('iCalDateParser', () => {
    it('Invalid input format throws error', () => {
      expect(() => iCalDateParser('20140422X233000Z')).toThrow();
      expect(() => iCalDateParser('20140422T233000Y')).toThrow();
      expect(() => iCalDateParser('20a40422T233000Z')).toThrow();
      expect(() => iCalDateParser('1994-11-05T08:15:30-05:00')).toThrow();
      expect(() => iCalDateParser('asdfgjfhgjkdfhsg')).toThrow();
      expect(() => iCalDateParser('butt')).toThrow();
    });

    it('Date gets parsed correctly', () => {
      let d = iCalDateParser('20140422T233000Z');
      expect(d.getUTCDate()).toEqual(22);

      d = iCalDateParser('20141203T012000Z');
      expect(d.getUTCDate()).toEqual(3);
    });

    it('Hour gets parsed correctly', () => {
      let d = iCalDateParser('20140422T233000Z');
      expect(d.getUTCHours()).toEqual(23);

      d = iCalDateParser('20141203T012000Z');
      expect(d.getUTCHours()).toEqual(1);
    });

    it('Minutes get parsed correctly', () => {
      let d = iCalDateParser('20140422T233000Z');
      expect(d.getUTCMinutes()).toEqual(30);

      d = iCalDateParser('20141203T012000Z');
      expect(d.getUTCMinutes()).toEqual(20);
    });

    it('Month gets parsed correctly', () => {
      let d = iCalDateParser('20140422T233000Z');
      expect(d.getUTCMonth()).toEqual(3);

      d = iCalDateParser('20141223T012000Z');
      expect(d.getUTCMonth()).toEqual(11);
    });
  });

  describe('testBegin', () => {
    it('should work', () => {
      expect(testBegin('BEGIN:')).toBeTruthy();
      expect(testBegin('BEGIN: AWD AWD AW')).toBeTruthy();
      expect(testBegin('begin: AWD AWD AW')).toBeFalsy();
      expect(testBegin('20141203T012000Z')).toBeFalsy();
    });
  });

  describe('matchBegin', () => {
    it('should work', () => {
      expect(matchBegin('BEGIN:')).toEqual('');
      expect(matchBegin('BEGIN: AWD AWD AW')).toEqual(' AWD AWD AW');
    });
  });

  describe('testEnd', () => {
    it('should work', () => {
      expect(testEnd('END:')).toBeTruthy();
      expect(testEnd('END: AWD AWD AW')).toBeTruthy();
      expect(testEnd('end: AWD AWD AW')).toBeFalsy();
      expect(testEnd('20141203T012000Z')).toBeFalsy();
    });
  });

  describe('matchEnd', () => {
    it('should work', () => {
      expect(matchEnd('END:')).toEqual('');
      expect(matchEnd('END: AWD AWD AW')).toEqual(' AWD AWD AW');
    });
  });

  describe('testKey', () => {
    it('should work', () => {
      expect(testKey('END:')).toBeTruthy();
      expect(testKey('END: AWD AWD AW')).toBeTruthy();
      expect(
        testKey('PRODID:-//Department of Labor//Bureau of Labor Statistics//EN')
      ).toBeTruthy();
      expect(testKey('end: AWD AWD AW')).toBeFalsy();
      expect(testKey('20141203T012000Z')).toBeFalsy();
    });
  });

  describe('matchKey', () => {
    it('should work', () => {
      expect(matchKey('RED:')).toEqual(['RED', '']);
      expect(matchKey('BOO: AWD AWD AW')).toEqual(['BOO', ' AWD AWD AW']);
      expect(
        matchKey(
          'PRODID:-//Department of Labor//Bureau of Labor Statistics//EN'
        )
      ).toEqual([
        'PRODID',
        '-//Department of Labor//Bureau of Labor Statistics//EN',
      ]);
    });
  });
});

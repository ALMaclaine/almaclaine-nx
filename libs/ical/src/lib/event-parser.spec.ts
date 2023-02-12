import { EventParser } from './event-parser';
import { EVENT_BEGIN, EVENT_END } from './constants';
import { expect } from 'vitest';
import { none, some } from '@almaclaine/types';

describe('EventParser', () => {
  it('should return invalid option if passed event_end when inactive', () => {
    const parser = new EventParser();
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(none());
  });

  it('should return invalid when passing event_begin', () => {
    const parser = new EventParser();
    const out1 = parser.nextLine(EVENT_BEGIN);
    expect(out1).toMatchObject(none());
  });

  it('should return valid when passing event_begin then event_end', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(some({}));
  });

  it('should return object with key', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:1');
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(some({ SEQUENCE: '1' }));
  });

  it('ensure cleared on event_begin', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:1');
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:2');
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(some({ SEQUENCE: '2' }));
  });

  it('should return object with keys', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:1');
    parser.nextLine('DESC:Here are some words');
    parser.nextLine('  1Here are some words');
    parser.nextLine('  2Here are some words');
    parser.nextLine('UID:4f0b35ca-13c9-4cbe-bacb-57bb8ac9834f');
    parser.nextLine('DURATION:PT0M');
    parser.nextLine('DTSTART;TZID=US-Eastern:20220112T083000');
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(
      some({
        SEQUENCE: '1',
        UID: '4f0b35ca-13c9-4cbe-bacb-57bb8ac9834f',
        DESC: 'Here are some words 1Here are some words 2Here are some words',
        DURATION: 'PT0M',
        DTSTART: 'TZID=US-Eastern:20220112T083000',
      })
    );
  });

  it('new lines dont cause problems', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:1');
    parser.nextLine('\n\n');
    parser.nextLine('UID:4f0b35ca-13c9-4cbe-bacb-57bb8ac9834f');
    parser.nextLine('DURATION:PT0M');
    parser.nextLine('\n\n');
    parser.nextLine('DTSTART;TZID=US-Eastern:20220112T083000');
    const out1 = parser.nextLine(EVENT_END);
    expect(out1).toMatchObject(
      some({
        SEQUENCE: '1',
        UID: '4f0b35ca-13c9-4cbe-bacb-57bb8ac9834f',
        DURATION: 'PT0M',
        DTSTART: 'TZID=US-Eastern:20220112T083000',
      })
    );
  });

  it('should return invalid if no event_end submitted', () => {
    const parser = new EventParser();
    parser.nextLine(EVENT_BEGIN);
    parser.nextLine('SEQUENCE:1');
    parser.nextLine('UID:4f0b35ca-13c9-4cbe-bacb-57bb8ac9834f');
    parser.nextLine('DURATION:PT0M');
    const out1 = parser.nextLine('DTSTART;TZID=US-Eastern:20220112T083000');
    expect(out1).toMatchObject(none());
  });
});

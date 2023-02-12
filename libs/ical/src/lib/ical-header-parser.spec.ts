import { ICalHeaderParser } from './ical-header-parser';
import { getIcsHeaderFiles } from './test-utils';

describe('ICalHeaderParser', () => {
  it('should work', () => {
    const parser = new ICalHeaderParser();
    const files = getIcsHeaderFiles();

    const out0 = parser.parseICalHeaderString(files[0]);
    expect(out0).toMatchObject({
      PRODID: '-//Department of Labor//Bureau of Labor Statistics//EN',
      VERSION: '2.0',
      CALSCALE: 'GREGORIAN',
      METHOD: 'PUBLISH',
      SUMMARY: 'BLS.gov Economic News Release Schedule',
      'X-WR-CALNAME': 'BLS.gov Economic News Release Schedule',
      'X-WR-TIMEZONE': 'US-Eastern',
      VTIMEZONE: {
        TZID: 'US-Eastern',
        DAYLIGHT: {
          TZOFFSETFROM: '-0500',
          TZOFFSETTO: '-0400',
          DTSTART: '20070311T020000',
          RRULE: 'FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
          TZNAME: 'EDT',
        },
        STANDARD: {
          TZOFFSETFROM: '-0400',
          TZOFFSETTO: '-0500',
          DTSTART: '20071104T020000',
          RRULE: 'FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
          TZNAME: 'EST',
        },
      },
    });

    const out1 = parser.parseICalHeaderString(files[1]);
    expect(out1).toMatchObject({
      PRODID: '-//Google Inc//Google Calendar 70.9054//EN',
      VERSION: '2.0',
      CALSCALE: 'GREGORIAN',
      METHOD: 'PUBLISH',
      'X-WR-CALNAME': 'CPA Calendar',
      'X-WR-TIMEZONE': 'America/Los_Angeles',
      VTIMEZONE: {
        TZID: 'America/Los_Angeles',
        'X-LIC-LOCATION': 'America/Los_Angeles',
        DAYLIGHT: {
          TZOFFSETFROM: '-0800',
          TZOFFSETTO: '-0700',
          TZNAME: 'PDT',
          DTSTART: '19700308T020000',
          RRULE: 'FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
        },
        STANDARD: {
          TZOFFSETFROM: '-0700',
          TZOFFSETTO: '-0800',
          TZNAME: 'PST',
          DTSTART: '19701101T020000',
          RRULE: 'FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
        },
      },
    });
  });
});

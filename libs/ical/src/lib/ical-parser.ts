import { EventParser } from './event-parser';
import { ICalHeaderParser } from './ical-header-parser';
import type { Line, RecordOrValue } from './types';
import { EVENT_BEGIN } from './constants';
import { isSome, someOrError } from '@almaclaine/option';
import { validateVCalendar } from './utils';

const PARSE_ICAL_ERROR =
  'Invalid Calendar, does not start with BEGIN:VCALENDAR or does not end with END:VCALENDAR';

type ICalParseResult = {
  header: RecordOrValue;
  events: RecordOrValue[];
};

class ICalParser {
  private eventParser = new EventParser();
  private headerParser = new ICalHeaderParser();

  private findFirstEvent(lines: Line[], start = 0, end = lines.length) {
    for (let i = start; i < end; i++) {
      if (lines[i] === EVENT_BEGIN) {
        return i;
      }
    }
    throw new Error('No Events in Calendar');
  }

  clear() {
    this.eventParser.clear();
    this.headerParser.clear();
  }

  private parseEvents(lines: Line[]): RecordOrValue[] {
    const records: RecordOrValue[] = [];
    for (const line of lines) {
      const out = this.eventParser.nextLine(line);
      if (isSome(out)) {
        records.push(out.value);
      }
    }
    return records;
  }

  parseICal(str: string): ICalParseResult {
    const lines: Line[] = str.split('\n');
    const vCalendarValidation = someOrError(
      validateVCalendar(lines),
      PARSE_ICAL_ERROR
    );

    const { indexStart, indexEnd } = vCalendarValidation;
    const firstEventIndex = this.findFirstEvent(lines, indexStart, indexEnd);
    const header = this.headerParser.parseICalHeader(
      lines.slice(indexStart, firstEventIndex)
    );
    const events = this.parseEvents(lines.slice(firstEventIndex, indexEnd - 1));
    return { header, events };
  }
}

export { ICalParser };
export type { ICalParseResult };

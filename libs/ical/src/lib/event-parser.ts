import type { Line, RecordOrValue } from './types';
import { EVENT_BEGIN, EVENT_END } from './constants';
import type { Option } from '@almaclaine/types';
import { matchKey, testKey } from './utils';
import { none, some, someOrError } from '@almaclaine/types';

class EventParser {
  private record: RecordOrValue = {};
  private active = false;
  private lastKey = '';
  private lastValue = '';

  clear() {
    this.record = {};
    this.active = false;
  }

  private handleEventBegin(): Option<RecordOrValue> {
    this.clear();
    this.active = true;
    return none();
  }

  private handleEventEnd(): Option<RecordOrValue> {
    if (this.active) {
      this.active = false;
      this.flush();
      return some(this.record);
    } else {
      return none();
    }
  }

  private handleKey(line: Line): Option<RecordOrValue> {
    this.flush();
    const match = matchKey(line);
    [this.lastKey, this.lastValue] = someOrError(
      match,
      `Invalid key pair: ${line}`
    );
    return none();
  }

  private flush() {
    if (this.lastKey) {
      this.record[this.lastKey] = this.lastValue;
    }
  }

  private handleContinuation(line: Line): Option<RecordOrValue> {
    this.lastValue += line.slice(1);
    return none();
  }

  private isContinuation(line: Line) {
    return line.startsWith(' ');
  }

  nextLine(line: Line): Option<RecordOrValue> {
    if (line.trim() === '') {
      return none();
    }

    if (line.trim() === EVENT_BEGIN) {
      return this.handleEventBegin();
    } else if (line.trim() === EVENT_END) {
      return this.handleEventEnd();
    } else if (testKey(line)) {
      return this.handleKey(line);
    } else if (this.isContinuation(line)) {
      return this.handleContinuation(line);
    } else {
      throw new Error('Should not happen');
    }
  }
}

export { EventParser };

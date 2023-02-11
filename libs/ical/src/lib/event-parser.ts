import type { Line, RecordOrValue } from './types';
import { EVENT_BEGIN, EVENT_END } from './constants';
import type { Option } from '@almaclaine/types';
import { matchKey, testKey } from './utils';

class EventParser {
  private record: RecordOrValue = {};
  private active = false;
  private lastKey = '';
  private lastValue = '';

  clear() {
    this.record = {};
    this.active = false;
  }

  private returnInvalid(): Option<RecordOrValue> {
    return {
      valid: false,
    };
  }

  private returnValid(): Option<RecordOrValue> {
    return {
      valid: true,
      value: this.record,
    };
  }

  private handleEventBegin(): Option<RecordOrValue> {
    this.clear();
    this.active = true;
    return this.returnInvalid();
  }

  private handleEventEnd(): Option<RecordOrValue> {
    if (this.active) {
      this.active = false;
      this.flush();
      return this.returnValid();
    } else {
      return this.returnInvalid();
    }
  }

  private handleKey(line: Line): Option<RecordOrValue> {
    this.flush();
    [this.lastKey, this.lastValue] = matchKey(line);
    return this.returnInvalid();
  }

  private flush() {
    if (this.lastKey) {
      this.record[this.lastKey] = this.lastValue;
    }
  }

  private handleContinuation(line: Line): Option<RecordOrValue> {
    this.lastValue += line.slice(1);
    return this.returnInvalid();
  }

  private isContinuation(line: Line) {
    return line.startsWith(' ');
  }

  nextLine(line: Line): Option<RecordOrValue> {
    if (line.trim() === '') {
      return this.returnInvalid();
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

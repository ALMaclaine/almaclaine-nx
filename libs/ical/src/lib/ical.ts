import type { Line, RecordOrValue } from './types';
import {
  matchBegin,
  matchEnd,
  matchKey,
  testBegin,
  testEnd,
  testKey,
  validateVCalendar,
} from './utils';
import { DoubleLinkedList } from '@almaclaine/double-linked-list';

class ICalParser {
  private beginStack = new DoubleLinkedList<string>();
  private outLevelStack = new DoubleLinkedList<RecordOrValue>();

  private peekTopRecord(): RecordOrValue {
    const currentOut = this.outLevelStack.peekHeadValue();
    if (!currentOut) {
      throw new Error('Should always be a top object');
    }
    return currentOut;
  }

  clear() {
    this.beginStack.clear();
    this.outLevelStack.clear();
  }

  private getBegin(line: Line): string {
    const newBegin = matchBegin(line);
    if (!newBegin) {
      throw new Error('Empty BEGIN');
    }
    return newBegin;
  }

  private tryKey(line: Line): boolean {
    if (testKey(line)) {
      const [key, value] = matchKey(line);
      const currentOut = this.peekTopRecord();
      currentOut[key] = value;
      return true;
    } else {
      return false;
    }
  }

  private tryBegin(line: Line): boolean {
    if (testBegin(line)) {
      const newBegin = this.getBegin(line);
      if (newBegin === 'VEVENT') {
        return true;
      }
      const currentOut = this.peekTopRecord();
      const newObj = {};
      currentOut[newBegin] = newObj;
      this.outLevelStack.addFront(newObj);
      this.beginStack.addFront(newBegin);
      return true;
    } else {
      return false;
    }
  }

  private tryEnd(line: Line): boolean {
    if (testEnd(line)) {
      const peekFront = this.beginStack.peekHeadValue();
      const end = matchEnd(line);
      if (peekFront !== end) {
        throw new Error(
          `Invalid iCal object, mismatched begin/ends: begin: ${peekFront} end: ${end}`
        );
      }

      this.outLevelStack.removeHead();
      this.beginStack.removeHead();
      return true;
    } else {
      return false;
    }
  }

  private;

  parseICal(str: string): RecordOrValue {
    const lines: Line[] = str.split('\n');
    if (!validateVCalendar(lines)) {
      throw new Error('Invalid VCalendar, missing begin or ending tag');
    }
    this.clear();
    this.outLevelStack.addFront({});
    for (const line of lines) {
      if (line === '') {
        continue;
      }

      if (this.tryBegin(line)) {
        const match = matchBegin(line);
        if (match === 'VEVENT') {
          break;
        }
        // nothing to do
      } else if (this.tryEnd(line)) {
        // nothing to do
      } else if (this.tryKey(line)) {
        // nothing to do
      } else {
        throw new Error(`Line didnt match: ${line}`);
      }
    }
    const record = this.outLevelStack.peekHeadValue();
    if (record) {
      return record;
    }
    throw new Error('Record should exist');
  }
}

export { ICalParser };

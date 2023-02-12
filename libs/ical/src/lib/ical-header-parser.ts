import type { Line, RecordOrValue } from './types';
import {
  matchBegin,
  matchEnd,
  matchKey,
  testBegin,
  testEnd,
  testKey,
} from './utils';
import { DoubleLinkedList } from '@almaclaine/double-linked-list';
import { isNone, someOrError } from '@almaclaine/types';

class ICalHeaderParser {
  private beginStack = new DoubleLinkedList<string>();
  private outLevelStack = new DoubleLinkedList<RecordOrValue>();
  private eventsBegan = false;

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
    return someOrError(newBegin, 'Empty BEGIN');
  }

  private tryKey(line: Line): boolean {
    if (testKey(line)) {
      const [key, value] = someOrError(
        matchKey(line),
        `Invalid Key Pair: ${line}`
      );
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

  private tryBeginEvent(line: Line): boolean {
    if (testBegin(line)) {
      const newBegin = this.getBegin(line);
      return newBegin === 'VEVENT';
    }
    return false;
  }

  private tryEnd(line: Line): boolean {
    if (testEnd(line)) {
      const end = someOrError(matchEnd(line));
      const peekFront = this.beginStack.peekHeadValue();
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

  parseICalHeader(lines: Line[]) {
    this.clear();
    this.outLevelStack.addFront({});
    for (const line of lines) {
      if (line === '') {
        continue;
      }

      if (this.tryBegin(line)) {
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

  parseICalHeaderString(str: string): RecordOrValue {
    const lines: Line[] = str.split('\n');
    return this.parseICalHeader(lines);
  }
}

export { ICalHeaderParser };

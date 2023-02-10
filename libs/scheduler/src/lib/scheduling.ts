import type { Duration } from 'date-fns';
import { uuid } from './utils';
import { isNumber } from '@almaclaine/is';
import { add } from 'date-fns';

type SchedulingProps = {
  id?: string;
  interval?: Duration;
  timeToExecute?: number | Date;
  repeat?: number;
};

class Scheduling {
  private readonly _id: string;
  private readonly _interval: Duration;
  private _timeToExecute: number;
  private _repeat: number;

  constructor({ interval, timeToExecute, repeat, id }: SchedulingProps) {
    const now = Date.now();
    this._id = id ?? uuid();
    this._repeat = repeat ?? 0;

    if (isNumber(timeToExecute)) {
      this._timeToExecute = timeToExecute;
    } else {
      this._timeToExecute = timeToExecute ? timeToExecute.getTime() : now;
    }

    this._interval = interval ?? {};

    if (!this.validateScheduling(this, now)) {
      throw new Error('Scheduling is only in the past');
    }

    this._timeToExecute = this.nextExecutionTime(this);
  }

  private validateScheduling(scheduling: Scheduling, now: number) {
    const { timeToExecute, interval, repeat } = scheduling;
    // give one second leeway
    if (!repeat) {
      return timeToExecute >= now - 1000;
    }

    if (repeat < 0) {
      return true;
    }

    let date = new Date(timeToExecute);
    for (let i = 0; i < repeat; i++) {
      if (date.getTime() > now) {
        return true;
      }
      date = add(date, interval);
    }
    return false;
  }

  private nextExecutionTime(scheduling: Scheduling): number {
    const { interval, repeat, timeToExecute } = scheduling;
    let iterations = repeat;
    const now = Date.now();
    let date = new Date(timeToExecute);
    const max = repeat < 0 ? Number.MAX_SAFE_INTEGER : repeat;
    for (let i = 0; i < max; i++) {
      if (date.getTime() > now) {
        return date.getTime();
      } else {
        date = add(date, interval);
      }

      if (repeat >= 0 && iterations === 0) {
        break;
      }
      iterations--;
    }
    return date.getTime();
  }

  get id() {
    return this._id;
  }

  get timeToExecute() {
    return this._timeToExecute;
  }

  get repeat() {
    return this._repeat;
  }

  get interval() {
    return this._interval;
  }

  shouldRepeat(): boolean {
    return this._repeat !== 0;
  }

  setupNextRepeat() {
    if (this.shouldRepeat()) {
      this._repeat = this.repeat - 1;
      this._timeToExecute = add(
        new Date(this.timeToExecute),
        this.interval
      ).getTime();
    } else {
      throw new Error('Out of repetitions');
    }
  }

  toObj(): SchedulingProps {
    return {
      id: this.id,
      timeToExecute: this.timeToExecute,
      repeat: this.repeat,
      interval: this.interval,
    };
  }
}

export { Scheduling };

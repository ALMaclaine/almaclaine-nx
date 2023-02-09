import type { Duration } from 'date-fns';
import { durationToTimestamp, uuid } from './utils';
import { isNumber } from '@almaclaine/is';

type SchedulingProps = {
  id?: string;
  interval?: Duration | number;
  timeToExecute?: number | Date;
  repeat?: number;
};

const validateScheduling = (scheduling: Scheduling) => {
  const { timeToExecute, interval, repeat } = scheduling;
  if (repeat < 0) {
    return true;
  }
  const longestTime = interval * repeat + timeToExecute;
  // give 1 second leeway
  return longestTime >= Date.now() - 1000;
};

class Scheduling {
  private readonly _id: string;
  private readonly _timeToExecute: number;
  private readonly _repeat: number;
  private readonly _interval: number;

  constructor({
    interval,
    timeToExecute = Date.now(),
    repeat,
    id,
  }: SchedulingProps) {
    this._id = id ?? uuid();
    this._repeat = repeat ?? 0;
    this._timeToExecute = isNumber(timeToExecute)
      ? timeToExecute
      : timeToExecute.getTime();
    this._interval = isNumber(interval)
      ? interval
      : durationToTimestamp(interval ?? {});
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

  toObj(): SchedulingProps {
    return {
      id: this.id,
      timeToExecute: this.timeToExecute,
      repeat: this.repeat,
      interval: this.interval,
    };
  }
}

export { Scheduling, validateScheduling };

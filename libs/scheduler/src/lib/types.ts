import type { Duration } from 'date-fns';

type SchedulingSetup = {
  timeToExecute: number | number[] | Date | Date[];
  repeat?: number;
  interval?: Duration;
};

type SchedulingCallback = () => void;

export type { SchedulingSetup, SchedulingCallback };

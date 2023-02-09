import type { Duration } from 'date-fns';

type EphemeralScheduling = {
  timeToExecute: number | number[] | Date | Date[];
  repeat?: number;
  interval?: Duration;
};

type SchedulingCallback = () => void;

export type { EphemeralScheduling, SchedulingCallback };

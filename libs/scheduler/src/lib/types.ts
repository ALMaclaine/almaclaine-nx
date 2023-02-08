import type { Duration } from 'date-fns';

type Scheduling = {
  id: string;
  timeToExecute: number;
  repeat: number;
  interval: number;
};

type EphemeralScheduling = {
  id?: string;
  timeToExecute: number | number[] | Date | Date[];
  repeat?: number;
  interval?: Duration;
};

type SchedulingCallback = () => void;

export type { EphemeralScheduling, SchedulingCallback, Scheduling };

import { EventEmitter } from 'events';
import type { EphemeralScheduling, SchedulingCallback } from './types';
import { isArray } from '@almaclaine/is';
import { CallbackManager } from './callback-manager';
import { Scheduling } from './scheduling';
import { SchedulerQueue } from './scheduler-queue';

class Scheduler {
  private readonly emitter = new EventEmitter();
  private readonly callbackManager = new CallbackManager();
  private readonly queue = new SchedulerQueue();

  constructor() {
    this.addStart();
    this.addFinished();
  }

  ephemeralScheduler(
    ephemScheduling: EphemeralScheduling,
    schedulingCallback: SchedulingCallback
  ) {
    const { timeToExecute, repeat, interval } = ephemScheduling;

    if (isArray(timeToExecute)) {
      for (const executionTimes of timeToExecute) {
        const tmpScheduling = { ...ephemScheduling, executionTimes };
        this.ephemeralScheduler(tmpScheduling, schedulingCallback);
      }
    } else {
      const scheduling = new Scheduling({ timeToExecute, repeat, interval });
      this.queue.add(scheduling);
      this.callbackManager.addCallback(scheduling.id, schedulingCallback);
    }
  }

  start() {
    this.emitter.emit('start');
  }

  private addStart() {
    this.emitter.on('start', () => {
      const now = Date.now();
      const peek = this.queue.peekFirstValue();
      if (peek && peek.timeToExecute <= now) {
        const item = this.queue.removeFirstValue();
        if (item) {
          this.emitter.emit('finished', item);
        }
      }
      process.nextTick(() => this.emitter.emit('start'));
    });
  }

  private addFinished() {
    this.emitter.on('finished', (scheduling: Scheduling) => {
      const func = this.callbackManager.getCallback(scheduling.id);
      func();

      if (scheduling.repeat) {
        const obj = {
          ...scheduling.toObj(),
          repeat: scheduling.repeat - 1,
          timeToExecute: scheduling.timeToExecute + scheduling.interval,
        };
        this.queue.add(new Scheduling(obj));
      }
    });
  }
}

const scheduler = () => {
  const sch = new Scheduler();
  const now = Date.now();
  sch.ephemeralScheduler(
    {
      timeToExecute: new Date(),
      repeat: 3,
      interval: { seconds: 2 },
    },
    () => console.log('exec1')
  );

  sch.ephemeralScheduler(
    {
      timeToExecute: now + 5000,
    },
    () => console.log('exec2')
  );

  sch.start();

  sch.ephemeralScheduler(
    {
      timeToExecute: now + 7000,
    },
    () => console.log('exec3')
  );
};

export { scheduler };

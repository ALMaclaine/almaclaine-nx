import { EventEmitter } from 'events';
import type { SchedulingSetup, SchedulingCallback } from './types';
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

  schedule(
    ephemScheduling: SchedulingSetup,
    schedulingCallback: SchedulingCallback
  ) {
    const { timeToExecute, repeat, interval } = ephemScheduling;

    if (isArray(timeToExecute)) {
      for (const executionTime of timeToExecute) {
        const tmpScheduling = {
          ...ephemScheduling,
          timeToExecute: executionTime,
        };
        this.schedule(tmpScheduling, schedulingCallback);
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
      if (peek && peek?.timeToExecute <= now) {
        const item = this.queue.removeFirstValue();
        if (item) {
          this.emitter.emit('finished', item);
        }
      }
      setImmediate(() => this.emitter.emit('start'));
    });
  }

  private addFinished() {
    this.emitter.on('finished', (scheduling: Scheduling) => {
      const func = this.callbackManager.getCallback(scheduling.id);
      func();

      if (scheduling.shouldRepeat()) {
        scheduling.setupNextRepeat();
        this.queue.add(scheduling);
      } else {
        this.callbackManager.removeCallback(scheduling.id);
      }
    });
  }
}

const scheduler = () => {
  const sch = new Scheduler();
  const now = Date.now();
  sch.schedule(
    {
      timeToExecute: new Date(),
      repeat: 3,
      interval: { seconds: 2 },
    },
    () => console.log('exec1')
  );

  sch.schedule(
    {
      timeToExecute: now + 5000,
    },
    () => console.log('exec2')
  );

  sch.start();

  sch.schedule(
    {
      timeToExecute: [now + 7000, now + 800, now + 9000],
    },
    () => console.log('exec3')
  );

  setTimeout(() => {
    console.log('set time out');
    sch.schedule(
      {
        timeToExecute: Date.now(),
      },
      () => console.log('exec4')
    );
  }, 15000);
};

export { scheduler, Scheduler };

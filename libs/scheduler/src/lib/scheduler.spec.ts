import { Scheduler } from './scheduler';
import { vitest } from 'vitest';

describe('Scheduler', () => {
  it('basic scheduling should work', async () => {
    const scheduler = new Scheduler();
    const func = vitest.fn();
    scheduler.start();
    await new Promise((res) => {
      scheduler.schedule(
        {
          timeToExecute: Date.now(),
        },
        () => {
          func();
          res({});
        }
      );
    });
    expect(func).toHaveBeenCalled();
  });
});

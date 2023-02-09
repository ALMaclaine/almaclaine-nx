import { Scheduling } from './scheduling';

describe('Scheduling', () => {
  it('gets a uuid if no id passed in', () => {
    const sch = new Scheduling({ interval: { minutes: 2 } });
    expect(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
        sch.id
      )
    ).toEqual(true);
  });

  it('respects id passed in', () => {
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2 },
    });
    expect(sch.id).toEqual(sch.id);
  });

  it('respects timeToExectute passed in', () => {
    const now = Date.now();
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2 },
      timeToExecute: now,
    });
    expect(sch.timeToExecute).toEqual(now);
  });

  it('converts duration to correct interval', () => {
    const now = Date.now();
    const duration = { minutes: 2, seconds: 1 };
    const sch = new Scheduling({
      id: 'id12',
      interval: duration,
      timeToExecute: now,
    });
    expect(sch.interval).toEqual(duration);
  });

  it('converts timeToExecute to correct number', () => {
    const date = new Date('12/21/32');
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
    });
    expect(sch.timeToExecute).toEqual(date.getTime());
  });

  it('validate works', () => {
    const date = new Date('12/21/12');
    const schObj = {
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
    };
    expect(() => new Scheduling(schObj)).toThrow();

    const sch1a = {
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
      repeat: -1,
    };
    expect(() => new Scheduling(sch1a)).not.toThrow();

    const sch1b = {
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
      repeat: 20_000_000,
    };
    expect(() => new Scheduling(sch1b)).not.toThrow();

    const sch1c = {
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
      repeat: 2_000_000,
    };
    expect(() => new Scheduling(sch1c)).toThrow();

    const sch2 = {
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
    };
    expect(() => new Scheduling(sch2)).not.toThrow();

    const sch3 = {
      id: 'id12',
      repeat: 1,
      interval: { minutes: -2, seconds: 1 },
    };
    expect(() => new Scheduling(sch3)).toThrow();
  });

  it('nextExecutionTime util works', () => {
    const date = new Date('12/21/12');
    const sch1 = new Scheduling({
      id: 'id12',
      interval: { years: 1 },
      repeat: -1,
      timeToExecute: date,
    });
    expect(sch1.timeToExecute).toEqual(new Date('12/21/23').getTime());
  });
});

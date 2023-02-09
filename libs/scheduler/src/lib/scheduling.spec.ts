import { Scheduling, validateScheduling } from './scheduling';

describe('Scheduling', () => {
  it('gets a uuid if no id passed in', () => {
    const sch = new Scheduling({ interval: { minutes: 2 }, timeToExecute: 0 });
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
      timeToExecute: 0,
    });
    expect(sch.id).toEqual(sch.id);
  });

  it('respects timeToExectute passed in', () => {
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2 },
      timeToExecute: 321,
    });
    expect(sch.timeToExecute).toEqual(321);
  });

  it('converts duration to correct interval', () => {
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: 0,
    });
    expect(sch.interval).toEqual(121000);
  });

  it('converts timeToExecute to correct number', () => {
    const date = new Date('12/21/12');
    const sch = new Scheduling({
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
    });
    expect(sch.timeToExecute).toEqual(date.getTime());
  });

  it('validateScheduling util works', () => {
    const date = new Date('12/21/12');
    const sch1 = new Scheduling({
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
      timeToExecute: date,
    });
    expect(validateScheduling(sch1)).toEqual(false);

    const sch2 = new Scheduling({
      id: 'id12',
      interval: { minutes: 2, seconds: 1 },
    });
    expect(validateScheduling(sch2)).toEqual(true);

    const sch3 = new Scheduling({
      id: 'id12',
      repeat: 1,
      interval: { minutes: -2, seconds: 1 },
    });
    expect(validateScheduling(sch3)).toEqual(false);
  });
});

import {
  addDurationToDate,
  dateDifferenceToTimestamp,
  addDurationToNow,
  durationToTimestamp,
} from './utils';

describe('utils', () => {
  it('dateDifferenceToTimestamp work', () => {
    expect(
      dateDifferenceToTimestamp(new Date('12/22/12'), new Date('12/21/12'))
    ).toEqual(86400000);

    expect(dateDifferenceToTimestamp(new Date(1000), new Date(0))).toEqual(
      1000
    );
  });

  it('addDurationToDate work', () => {
    expect(addDurationToDate(new Date(0), { minutes: 2 }).getTime()).toEqual(
      120000
    );
  });

  it('addDurationToNow work', () => {
    expect(addDurationToNow({ minutes: 2 }).getTime()).toEqual(
      Date.now() + 120000
    );
  });

  it('durationToTimestamp work', () => {
    expect(durationToTimestamp({ minutes: 2 })).toEqual(120000);
    expect(durationToTimestamp({})).toEqual(0);
  });
});

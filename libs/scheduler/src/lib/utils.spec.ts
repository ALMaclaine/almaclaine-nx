import { addDurationToDate, dateDifferenceToTimestamp } from './utils';

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
});

import {
  random,
  randomInRange,
  randomInRangeSeed,
  randomSeed,
  randomUnit,
  randomUnitSeed,
} from './random';
import { expect } from 'vitest';

describe('random', () => {
  it('should work', () => {
    expect(random(0)).toEqual(972348567);
    expect(random(1)).toEqual(2811915801);

    expect(randomSeed(0)).toEqual([972348567, 972348567]);
    expect(randomSeed(1)).toEqual([2811915801, 2811915801]);
    expect(randomSeed(1)).not.toEqual([972348567, 972348567]);

    for (let i = 0; i < 1000; i++) {
      const unit = randomUnit(Math.random());
      expect(unit >= 0 && unit <= 1).toBeTruthy();
    }

    expect(randomUnitSeed(0)).toEqual([972348567, 0.5322276469340935]);
    expect(randomUnitSeed(972348567)).toEqual([4385263630, 0.4468903476362105]);
    expect(randomUnitSeed(4385263630)).toEqual([
      3682131132, 0.8204534623884007,
    ]);

    for (let i = 0; i < 1000; i++) {
      const inRange = randomInRange(Math.random(), -10, 10);
      expect(inRange >= -10 && inRange <= 10).toBeTruthy();
    }

    expect(randomInRangeSeed(0, -10, 10)).toEqual([972348567, 0]);
    expect(randomInRangeSeed(972348567, -10, 10)).toEqual([4385263630, -2]);
    expect(randomInRangeSeed(4385263630, -10, 10)).toEqual([3682131132, 6]);
    expect(randomInRangeSeed(3682131132, -10, 10)).toEqual([6760086120, 0]);
  });
});

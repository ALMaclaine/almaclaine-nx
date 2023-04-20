import { lerp } from '../lerp';

describe('math/lerp()', function () {
  it('interpolate values', function () {
    expect(lerp(0.5, 0, 10)).toEqual(5);
    expect(lerp(0.75, 0, 100)).toEqual(75);
    expect(lerp(0.66, 0, 1000)).toEqual(660);
    expect(lerp(1, 0, 1000)).toEqual(1000);
    expect(lerp(0, 0, 1000)).toEqual(0);
  });

  it('lerp works work', () => {
    expect(lerp(0, 20, 80)).toBe(20);
    expect(lerp(1, 20, 80)).toBe(80);
    expect(lerp(0.5, 0, 80)).toBe(40);
  });

  it('no -0', function () {
    expect(lerp(-0, -0, 80)).toBe(0);
  });
});

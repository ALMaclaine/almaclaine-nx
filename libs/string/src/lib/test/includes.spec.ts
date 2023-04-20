import { includes } from '../includes';

describe('string/includes()', function () {
  it('should return true if string includes substring', function () {
    expect(includes('lorem ipsum', 'lor')).toEqual(true);
    expect(includes('lorem ipsum', 'o')).toEqual(true);
    expect(includes('lorem ipsum', 'ip')).toEqual(true);
    expect(includes('lorem ipsum', 'sum')).toEqual(true);
  });

  it("should return false if string doesn't contain substring", function () {
    expect(includes('lorem ipsum', 'a')).toEqual(false);
    expect(includes('lorem ipsum', 'lord')).toEqual(false);
    expect(includes('lorem ipsum', 'bar')).toEqual(false);
  });

  it('should work with empty strings', function () {
    expect(includes('', '')).toEqual(true);
    expect(includes('foo', '')).toEqual(true);
  });

  it('should start search at given "fromIndex"', function () {
    expect(includes('lorem ipsum', 'o', 0)).toEqual(true);
    expect(includes('lorem ipsum', 'o', 1)).toEqual(true);
    expect(includes('lorem ipsum', 'o', 2)).toEqual(false);
    expect(includes('lorem ipsum', 'o', 200)).toEqual(false);
  });

  it('should treat negative fromIndex === 0', function () {
    expect(includes('lorem ipsum', 'o', -1)).toEqual(true);
    expect(includes('lorem ipsum', 'o', -9)).toEqual(true);
    expect(includes('lorem ipsum', 'o', -10)).toEqual(true);
    expect(includes('lorem ipsum', 'o', -11)).toEqual(true);
  });
});

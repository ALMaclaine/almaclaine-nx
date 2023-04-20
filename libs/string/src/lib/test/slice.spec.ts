import { slice } from '../slice';

describe('string/slice()', function () {
  const str = 'The quick brown fox jumps over the lazy dog.';
  it('should limit number of chars', function () {
    expect(slice(str, 31)).toBe('the lazy dog.');
    expect(slice(str, 4, 19)).toBe('quick brown fox');

    expect(slice(str, -4)).toBe('dog.');
    expect(slice(str, -9, -5)).toBe('lazy');
    expect(slice(str)).toBe(str);
  });
});

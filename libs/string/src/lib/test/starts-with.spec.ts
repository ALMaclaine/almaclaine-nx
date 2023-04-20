import { startsWith } from '../starts-with';

describe('string/startsWith()', function () {
  it('should return true if string starts with prefix', function () {
    expect(startsWith('lorem-ipsum', 'lorem')).toBeTruthy();
  });

  it('should return false if string does not start with prefix', function () {
    expect(startsWith('lorem-ipsum', 'ipsum')).toBeFalsy();
  });

  it('should return true if prefix is empty', function () {
    expect(startsWith('', '')).toBeTruthy();
    expect(startsWith('lorem', '')).toBeTruthy();
  });
});

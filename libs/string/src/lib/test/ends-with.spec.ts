import { endsWith } from '../ends-with';

describe('string/endsWith()', function () {
  it('should return true if string ends with suffix', function () {
    expect(endsWith('lorem-ipsum', 'ipsum')).toBeTruthy();
  });

  it('should return false if string does not end with suffix', function () {
    expect(endsWith('lorem-ipsum', 'lorem')).toBeFalsy();
  });
});

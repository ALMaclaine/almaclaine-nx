import { toString } from '../to-string';

describe('lang/toString', () => {
  it('should convert null to empty string', () => {
    expect(toString(null)).toBe('');
  });

  it('should convert undefined to empty string', () => {
    expect(toString(void 0)).toBe('');
  });

  it('should return string unchanged', () => {
    expect(toString('')).toBe('');
    expect(toString('test')).toBe('test');
  });

  it('should return number as string', () => {
    expect(toString(0)).toBe('0');
    expect(toString(10)).toBe('10');
  });

  it('should return date as string', () => {
    expect(toString(new Date())).toBe(new Date().toString());
  });

  it('should print objects correctly', () => {
    expect(toString({})).toBe('{}');

    const obj = { a: 2, b: { c: 3 } };
    expect(toString(obj)).toBe(JSON.stringify(obj));
  });

  it('should print array correctly', () => {
    expect(toString([1, 2, 3])).toBe('[1, 2, 3]');
    expect(toString([{ a: 2 }, 2, 3])).toBe('[{"a":2}, 2, 3]');
  });

  it('should print toString correctly', () => {
    const obj = { toString: () => 'abcde' };
    expect(toString(obj)).toBe('abcde');
  });

  it('should return boolean as string', () => {
    expect(toString(false)).toBe('false');
    expect(toString(true)).toBe('true');
  });
});

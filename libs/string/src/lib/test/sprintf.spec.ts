import { sprintf } from '../sprintf';

describe('sprintf works', () => {
  it('sprintf works work', () => {
    expect(sprintf('%s', ['a'])).toBe('a');
    expect(sprintf('%s%s', ['a'])).toBe('a%s');
    expect(sprintf('%s %s', ['a', 'a'])).toBe('a a');
    expect(
      sprintf('Hello my name is %s, I am %s years old.', ['John', '33'])
    ).toBe('Hello my name is John, I am 33 years old.');
  });
});

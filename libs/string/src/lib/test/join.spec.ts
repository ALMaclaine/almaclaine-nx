import { join } from '../join';

describe('join', () => {
  it('should join strings with the given separator', () => {
    expect(join(',', 'a', 'b', 'c')).toBe('a,b,c');
    expect(join('-', 'foo', 'bar', 'baz')).toBe('foo-bar-baz');
    expect(join('', 'hello', 'world')).toBe('helloworld');
  });

  it('should return an empty string if no arguments are provided', () => {
    expect(join(',')).toBe('');
  });
});

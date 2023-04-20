import { search } from '../search';

const paragraph =
  'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
const regex = /[^\w\s]/g;

describe('string/search()', function () {
  it('should limit number of chars', function () {
    expect(search(paragraph, regex)).toBe(43);
  });
});

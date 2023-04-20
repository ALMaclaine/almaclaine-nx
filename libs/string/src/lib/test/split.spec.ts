import { split } from '../split';

describe('string/split', () => {
  it('split', () => {
    expect(split('1.1', '.')).toEqual(['1', '1']);
    expect(split('1.1', /\./)).toEqual(['1', '1']);
    expect(split('1.1.1', /\./, 2)).toEqual(['1', '1']);
  });
});

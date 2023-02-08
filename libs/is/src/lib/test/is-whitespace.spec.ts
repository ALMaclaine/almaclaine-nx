import { isWhitespace } from '../is-whitespace';
import { WHITE_SPACES } from '@almaclaine/constants';

describe('lang/isWhitespace()', function () {
  it('isWhitespace works', () => {
    expect(isWhitespace(WHITE_SPACES[0])).toBe(true);
    expect(isWhitespace(WHITE_SPACES[4])).toBe(true);
    expect(isWhitespace(WHITE_SPACES[7])).toBe(true);
    expect(isWhitespace(null)).toBe(false);
    expect(isWhitespace('')).toBe(false);
    expect(isWhitespace(123)).toBe(false);
    expect(isWhitespace([])).toBe(false);
    expect(isWhitespace({})).toBe(false);
    expect(isWhitespace('awd')).toBe(false);
    expect(isWhitespace('')).toBe(false);
  });
});

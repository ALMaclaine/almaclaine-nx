import { norm } from '../norm';

describe('norm works', () => {
  it('norm works work', () => {
    expect(norm(75, 50, 100)).toBe(0.5);
    expect(norm(25, 50, 100)).toBe(0);
    expect(norm(125, 50, 100)).toBe(1);
  });
});

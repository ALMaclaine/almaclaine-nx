import { floor } from '@almaclaine/math';
import { groupBy } from '../group-by';
import { toString } from '@almaclaine/core';

describe('array/groupBy', function () {
  it('should bucket appropriately', function () {
    // Test case borrowed from lodash.
    expect(groupBy([4.2, 6.1, 6.4], floor)).toEqual({
      '4': [4.2],
      '6': [6.1, 6.4],
    });
  });

  it('should default to identity function', function () {
    expect(groupBy([1, 2, 2, 1, 1])).toEqual({ '1': [1, 1, 1], '2': [2, 2] });
  });

  it('should categorize by property', function () {
    expect(
      groupBy(['green', 'eggs', 'and', 'ham'], (val) => toString(val.length))
    ).toEqual({
      '3': ['and', 'ham'],
      '4': ['eggs'],
      '5': ['green'],
    });
  });
});

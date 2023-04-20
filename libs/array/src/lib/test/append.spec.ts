import { collect } from '../collect';
import { append } from '../append';

describe('array/append', () => {
  it('append should work1', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    append(arr1, arr2);
    expect(arr1).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it('append should work1', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    const arr3 = [6, 7, 8];
    append(arr1, arr2, arr3);
    expect(arr1).toEqual([1, 2, 3, 3, 4, 5, 6, 7, 8]);
  });
});

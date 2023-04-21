import { map } from '../map';

describe('array/map', () => {
  test('should apply the function to each element of the array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (x: number) => x * 2;

    const result = map(numbers, double);

    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  test('should return an empty array if the input array is empty', () => {
    const numbers: number[] = [];
    const double = (x: number) => x * 2;

    const result = map(numbers, double);

    expect(result).toEqual([]);
  });

  test('should apply the function to each element of the array (number)', () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (x: number) => x * 2;

    const result = map(numbers, double);

    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  test('should apply the function to each element of the array (string)', () => {
    const strings = ['hello', 'world'];
    const capitalize = (x: string) => x.toUpperCase();

    const result = map(strings, capitalize);

    expect(result).toEqual(['HELLO', 'WORLD']);
  });

  test('should apply the function to each element of the array (object)', () => {
    const objects = [{ name: 'John' }, { name: 'Jane' }];
    const getName = (x: { name: string }) => x.name;

    const result = map(objects, getName);

    expect(result).toEqual(['John', 'Jane']);
  });

  test('should return an empty array if the input array is empty', () => {
    const numbers: number[] = [];
    const double = (x: number) => x * 2;

    const result = map(numbers, double);

    expect(result).toEqual([]);
  });
});

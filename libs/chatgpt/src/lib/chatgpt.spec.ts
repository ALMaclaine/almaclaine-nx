// getEncodedLength.test.ts
import { getEncodedLength, decodeTokens } from './utils';
import { encode } from 'gpt-3-encoder';

describe('utils', function () {
  describe('decodeTokens', () => {
    it('should return an empty array for an empty input array', () => {
      const result = decodeTokens([]);
      expect(result).toEqual([]);
    });

    it('should decode a single token correctly', () => {
      const testTokens = [72];
      const expectedResult = ['i'];
      const result = decodeTokens(testTokens);
      expect(result).toEqual(expectedResult);
    });

    it('should decode tokens 1', () => {
      const testTokens = encode('hello'); // Hello
      const expectedResult = ['hello'];
      const result = decodeTokens(testTokens);
      expect(result).toEqual(expectedResult);
    });

    it('should decode tokens 2', () => {
      const testTokens = encode(
        'hello, how are you wont you tell me your name'
      ); // Hello
      const expectedResult = [
        'hello',
        ',',
        ' how',
        ' are',
        ' you',
        ' wont',
        ' you',
        ' tell',
        ' me',
        ' your',
        ' name',
      ];
      const result = decodeTokens(testTokens);
      expect(result).toEqual(expectedResult);
    });

    it('should decode tokens with Unicode characters correctly', () => {
      const testTokens = encode('こんにちは世界'); // こんにちは世界
      const expectedResult = ['こ', 'ん', 'に', 'ち', 'は', '世', '界'];
      const result = decodeTokens(testTokens);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getEncodedLength', () => {
    it('should return the encoded length of an empty string', () => {
      const result = getEncodedLength('');
      expect(result).toBe(0);
    });

    it('should return the encoded length of a non-empty string', () => {
      const testString = 'Hello, world!';
      const expectedResult = encode(testString).length;
      const result = getEncodedLength(testString);
      expect(result).toBe(expectedResult);
    });

    it('should return the correct encoded length for strings with special characters', () => {
      const testString = 'GPT-4 is "awesome"!';
      const expectedResult = encode(testString).length;
      const result = getEncodedLength(testString);
      expect(result).toBe(expectedResult);
    });

    it('should return the correct encoded length for strings with Unicode characters', () => {
      const testString = 'こんにちは世界';
      const expectedResult = encode(testString).length;
      const result = getEncodedLength(testString);
      expect(result).toBe(expectedResult);
    });
  });
});

import { concatArn, concatName, concatUrl } from './cfn-outputs-utils';

describe('cfn-outputs-utils', () => {
  describe('generateName function', () => {
    it('should concatenate prefix and "Name"', () => {
      expect(concatName('hello')).toBe('helloName');
      expect(concatName('foo')).toBe('fooName');
    });

    it('should handle empty prefix', () => {
      expect(concatName('')).toBe('Name');
    });
  });

  describe('generateArn function', () => {
    it('should concatenate prefix and "Arn"', () => {
      expect(concatArn('hello')).toBe('helloArn');
      expect(concatArn('foo')).toBe('fooArn');
    });

    it('should handle empty prefix', () => {
      expect(concatArn('')).toBe('Arn');
    });
  });

  describe('generateUrl function', () => {
    it('should concatenate prefix and "Url"', () => {
      expect(concatUrl('hello')).toBe('helloUrl');
      expect(concatUrl('foo')).toBe('fooUrl');
    });

    it('should handle empty prefix', () => {
      expect(concatUrl('')).toBe('Url');
    });
  });
});

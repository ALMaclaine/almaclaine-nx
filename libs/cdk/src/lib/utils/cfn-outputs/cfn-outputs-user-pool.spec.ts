import {
  generateUserPoolName,
  generateUserPoolClientName,
} from './cfn-outputs-user-pool';

describe('cfn-outputs-user-pool', () => {
  describe('generateName function', () => {
    it('should concatenate prefix and "Name"', () => {
      expect(generateUserPoolName('hello')).toBe('helloUserPoolName');
      expect(generateUserPoolName('foo')).toBe('fooUserPoolName');
    });

    it('should handle empty prefix', () => {
      expect(generateUserPoolName('')).toBe('UserPoolName');
    });
  });

  describe('generateArn function', () => {
    it('should concatenate prefix and "Arn"', () => {
      expect(generateUserPoolClientName('hello')).toBe(
        'helloUserPoolClientName'
      );
      expect(generateUserPoolClientName('foo')).toBe('fooUserPoolClientName');
    });

    it('should handle empty prefix', () => {
      expect(generateUserPoolClientName('')).toBe('UserPoolClientName');
    });
  });
});

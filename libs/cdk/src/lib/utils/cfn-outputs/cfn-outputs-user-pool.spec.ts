import {
  generateCfnUserPoolName,
  generateCfnUserPoolClientName,
} from './cfn-outputs-user-pool';

describe('cfn-outputs-user-pool', () => {
  describe('generateName function', () => {
    it('should concatenate prefix and "Name"', () => {
      expect(generateCfnUserPoolName('hello')).toBe('helloUserPoolName');
      expect(generateCfnUserPoolName('foo')).toBe('fooUserPoolName');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnUserPoolName('')).toBe('UserPoolName');
    });
  });

  describe('generateArn function', () => {
    it('should concatenate prefix and "Arn"', () => {
      expect(generateCfnUserPoolClientName('hello')).toBe(
        'helloUserPoolClientName'
      );
      expect(generateCfnUserPoolClientName('foo')).toBe(
        'fooUserPoolClientName'
      );
    });

    it('should handle empty prefix', () => {
      expect(generateCfnUserPoolClientName('')).toBe('UserPoolClientName');
    });
  });
});

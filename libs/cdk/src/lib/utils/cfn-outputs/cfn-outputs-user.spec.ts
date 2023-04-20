import { describe } from 'vitest';
import {
  generateCfnVercelServerUserName,
  generateVercelServerUserArn,
} from './cfn-outputs-user';

describe('cfn-outputs-user', () => {
  describe('generateCfnVercelServerUser function', () => {
    it('should generate name with "VercelServerUser" suffix', () => {
      expect(generateCfnVercelServerUserName('hello')).toBe(
        'helloVercelServerUserName'
      );
      expect(generateCfnVercelServerUserName('foo')).toBe(
        'fooVercelServerUserName'
      );
    });

    it('should handle empty prefix', () => {
      expect(generateCfnVercelServerUserName('')).toBe('VercelServerUserName');
    });
  });

  describe('generateVercelServerUserArn function', () => {
    it('should generate ARN with "VercelServerUser" suffix', () => {
      expect(generateVercelServerUserArn('hello')).toBe(
        'helloVercelServerUserArn'
      );
      expect(generateVercelServerUserArn('foo')).toBe('fooVercelServerUserArn');
    });

    it('should handle empty prefix', () => {
      expect(generateVercelServerUserArn('')).toBe('VercelServerUserArn');
    });
  });
});

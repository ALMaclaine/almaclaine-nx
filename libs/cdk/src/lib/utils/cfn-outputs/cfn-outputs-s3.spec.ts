import { describe } from 'vitest';
import {
  generateCfnS3BucketArn,
  generateCfnS3BucketName,
} from './cfn-outputs-s3';

describe('cfn-outputs-s3', () => {
  describe('generateCfnS3BucketName function', () => {
    it('should generate name with "Bucket" suffix', () => {
      expect(generateCfnS3BucketName('hello')).toBe('helloBucketName');
      expect(generateCfnS3BucketName('foo')).toBe('fooBucketName');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnS3BucketName('')).toBe('BucketName');
    });
  });

  describe('generateCfnS3BucketArn function', () => {
    it('should generate ARN with "Bucket" suffix', () => {
      expect(generateCfnS3BucketArn('hello')).toBe('helloBucketArn');
      expect(generateCfnS3BucketArn('foo')).toBe('fooBucketArn');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnS3BucketArn('')).toBe('BucketArn');
    });
  });
});

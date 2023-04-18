import { describe, it, expect } from 'vitest';
import {
  generateCfnAuthStack,
  generateCfnQueueStack,
  generateCfnS3Stack,
  generateCfnTableStack,
  generateCfnUserStack,
  generateStackName,
  generateStackPrefix,
} from './cfn-outputs-stack';

describe('cfn-outputs-stack', () => {
  describe('generateStackPrefix function', () => {
    it('should convert prefix to lowercase', () => {
      expect(generateStackPrefix('Hello')).toBe('hello');
      expect(generateStackPrefix('FOO')).toBe('foo');
      expect(generateStackPrefix('BaR')).toBe('bar');
    });

    it('should handle empty prefix', () => {
      expect(generateStackPrefix('')).toBe('');
    });
  });

  describe('generateStackName function', () => {
    it('should concatenate prefix, "-", and stack', () => {
      expect(generateStackName('hello', 'world')).toBe('hello-world');
      expect(generateStackName('foo', 'bar')).toBe('foo-bar');
    });

    it('should handle empty prefix', () => {
      expect(generateStackName('', 'world')).toBe('-world');
    });

    it('should handle empty stack', () => {
      expect(generateStackName('hello', '')).toBe('hello-');
    });
  });

  describe('generateCfnQueueStack function', () => {
    it('should generate stack name with "queue" suffix', () => {
      expect(generateCfnQueueStack('hello')).toBe('hello-queue');
      expect(generateCfnQueueStack('foo')).toBe('foo-queue');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnQueueStack('')).toBe('-queue');
    });
  });

  describe('generateCfnS3Stack function', () => {
    it('should generate stack name with "s3" suffix', () => {
      expect(generateCfnS3Stack('hello')).toBe('hello-s3');
      expect(generateCfnS3Stack('foo')).toBe('foo-s3');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnS3Stack('')).toBe('-s3');
    });
  });

  describe('generateCfnTableStack function', () => {
    it('should generate stack name with "table" suffix', () => {
      expect(generateCfnTableStack('hello')).toBe('hello-table');
      expect(generateCfnTableStack('foo')).toBe('foo-table');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnTableStack('')).toBe('-table');
    });
  });

  describe('generateCfnUserStack function', () => {
    it('should generate stack name with "user" suffix', () => {
      expect(generateCfnUserStack('hello')).toBe('hello-user');
      expect(generateCfnUserStack('foo')).toBe('foo-user');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnUserStack('')).toBe('-user');
    });
  });

  describe('generateCfnAuthStack function', () => {
    it('should generate stack name with "auth" suffix', () => {
      expect(generateCfnAuthStack('hello')).toBe('hello-auth');
      expect(generateCfnAuthStack('foo')).toBe('foo-auth');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnAuthStack('')).toBe('-auth');
    });
  });
});

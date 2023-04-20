import { describe } from 'vitest';
import {
  generateDeadQueueName,
  generateQueueName,
  generateQueueUrl,
  generateQueueArn,
  generateDeadQueueArn,
  generateDeadQueueUrl,
} from './cfn-outputs-queue';

describe('cfn-outputs-queue', () => {
  describe('generateQueueName function', () => {
    it('should generate name with "Queue" suffix', () => {
      expect(generateQueueName('hello')).toBe('helloQueueName');
      expect(generateQueueName('foo')).toBe('fooQueueName');
    });

    it('should handle empty prefix', () => {
      expect(generateQueueName('')).toBe('QueueName');
    });
  });

  describe('generateQueueArn function', () => {
    it('should generate ARN with "Queue" suffix', () => {
      expect(generateQueueArn('hello')).toBe('helloQueueArn');
      expect(generateQueueArn('foo')).toBe('fooQueueArn');
    });

    it('should handle empty prefix', () => {
      expect(generateQueueArn('')).toBe('QueueArn');
    });
  });

  describe('generateQueueUrl function', () => {
    it('should generate ARN with "Queue" suffix', () => {
      expect(generateQueueUrl('hello')).toBe('helloQueueUrl');
      expect(generateQueueUrl('foo')).toBe('fooQueueUrl');
    });

    it('should handle empty prefix', () => {
      expect(generateQueueUrl('')).toBe('QueueUrl');
    });
  });

  describe('generateDeadQueueName function', () => {
    it('should generate name with "DeadQueue" suffix', () => {
      expect(generateDeadQueueName('hello')).toBe('helloDeadQueueName');
      expect(generateDeadQueueName('foo')).toBe('fooDeadQueueName');
    });

    it('should handle empty prefix', () => {
      expect(generateDeadQueueName('')).toBe('DeadQueueName');
    });
  });

  describe('generateDeadQueueArn function', () => {
    it('should generate ARN with "DeadQueue" suffix', () => {
      expect(generateDeadQueueArn('hello')).toBe('helloDeadQueueArn');
      expect(generateDeadQueueArn('foo')).toBe('fooDeadQueueArn');
    });

    it('should handle empty prefix', () => {
      expect(generateDeadQueueArn('')).toBe('DeadQueueArn');
    });
  });

  describe('generateDeadQueueUrl function', () => {
    it('should generate ARN with "DeadQueue" suffix', () => {
      expect(generateDeadQueueUrl('hello')).toBe('helloDeadQueueUrl');
      expect(generateDeadQueueUrl('foo')).toBe('fooDeadQueueUrl');
    });

    it('should handle empty prefix', () => {
      expect(generateDeadQueueUrl('')).toBe('DeadQueueUrl');
    });
  });
});

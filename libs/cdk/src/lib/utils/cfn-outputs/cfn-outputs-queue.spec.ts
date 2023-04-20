import { describe } from 'vitest';
import {
  generateCfnDeadQueueName,
  generateCfnQueueName,
  generateCfnQueueUrl,
  generateCfnQueueArn,
  generateCfnDeadQueueArn,
  generateCfnDeadQueueUrl,
} from './cfn-outputs-queue';

describe('cfn-outputs-queue', () => {
  describe('generateCfnQueueName function', () => {
    it('should generate name with "Queue" suffix', () => {
      expect(generateCfnQueueName('hello')).toBe('helloQueueName');
      expect(generateCfnQueueName('foo')).toBe('fooQueueName');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnQueueName('')).toBe('QueueName');
    });
  });

  describe('generateCfnQueueArn function', () => {
    it('should generate ARN with "Queue" suffix', () => {
      expect(generateCfnQueueArn('hello')).toBe('helloQueueArn');
      expect(generateCfnQueueArn('foo')).toBe('fooQueueArn');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnQueueArn('')).toBe('QueueArn');
    });
  });

  describe('generateCfnQueueUrl function', () => {
    it('should generate ARN with "Queue" suffix', () => {
      expect(generateCfnQueueUrl('hello')).toBe('helloQueueUrl');
      expect(generateCfnQueueUrl('foo')).toBe('fooQueueUrl');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnQueueUrl('')).toBe('QueueUrl');
    });
  });

  describe('generateCfnDeadQueueName function', () => {
    it('should generate name with "DeadQueue" suffix', () => {
      expect(generateCfnDeadQueueName('hello')).toBe('helloDeadQueueName');
      expect(generateCfnDeadQueueName('foo')).toBe('fooDeadQueueName');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnDeadQueueName('')).toBe('DeadQueueName');
    });
  });

  describe('generateCfnDeadQueueArn function', () => {
    it('should generate ARN with "DeadQueue" suffix', () => {
      expect(generateCfnDeadQueueArn('hello')).toBe('helloDeadQueueArn');
      expect(generateCfnDeadQueueArn('foo')).toBe('fooDeadQueueArn');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnDeadQueueArn('')).toBe('DeadQueueArn');
    });
  });

  describe('generateCfnDeadQueueUrl function', () => {
    it('should generate ARN with "DeadQueue" suffix', () => {
      expect(generateCfnDeadQueueUrl('hello')).toBe('helloDeadQueueUrl');
      expect(generateCfnDeadQueueUrl('foo')).toBe('fooDeadQueueUrl');
    });

    it('should handle empty prefix', () => {
      expect(generateCfnDeadQueueUrl('')).toBe('DeadQueueUrl');
    });
  });
});

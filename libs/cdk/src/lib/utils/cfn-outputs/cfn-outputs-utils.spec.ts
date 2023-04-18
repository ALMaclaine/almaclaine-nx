import {
  generateArn,
  generateName,
  generateUrl,
  prefix,
} from './cfn-outputs-utils';
import { describe, it, expect } from 'vitest';

describe('cfn-outputs-utils', () => {
  describe('prefix function', () => {
    it('should concatenate prefix and suffix', () => {
      expect(prefix('hello', 'world')).toBe('helloworld');
      expect(prefix('foo', 'bar')).toBe('foobar');
    });

    it('should handle empty strings', () => {
      expect(prefix('', 'world')).toBe('world');
      expect(prefix('hello', '')).toBe('hello');
      expect(prefix('', '')).toBe('');
    });
  });

  describe('generateName function', () => {
    it('should concatenate prefix and "Name"', () => {
      expect(generateName('hello')).toBe('helloName');
      expect(generateName('foo')).toBe('fooName');
    });

    it('should handle empty prefix', () => {
      expect(generateName('')).toBe('Name');
    });
  });

  describe('generateArn function', () => {
    it('should concatenate prefix and "Arn"', () => {
      expect(generateArn('hello')).toBe('helloArn');
      expect(generateArn('foo')).toBe('fooArn');
    });

    it('should handle empty prefix', () => {
      expect(generateArn('')).toBe('Arn');
    });
  });

  describe('generateUrl function', () => {
    it('should concatenate prefix and "Url"', () => {
      expect(generateUrl('hello')).toBe('helloUrl');
      expect(generateUrl('foo')).toBe('fooUrl');
    });

    it('should handle empty prefix', () => {
      expect(generateUrl('')).toBe('Url');
    });
  });
});

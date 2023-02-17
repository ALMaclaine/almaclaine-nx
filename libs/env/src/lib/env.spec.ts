import { getEnv, setEnv } from './env';
import { none, some } from '@almaclaine/option';
import { expect } from 'vitest';

describe('env', () => {
  describe('getEnv', () => {
    it('should work', () => {
      expect(getEnv('')).toEqual(none());
      expect(getEnv('DOESNT EXIST')).toEqual(none());
      process.env['DOES_EXIST'] = 'EXISTS';
      expect(getEnv('DOES_EXIST')).toMatchObject(some('EXISTS'));
    });
  });

  describe('setEnv', () => {
    it('should work', () => {
      setEnv('DOES_EXIST', 'EXISTS');
      expect(process.env['DOES_EXIST']).toMatchObject('EXISTS');
    });
  });
});

import {
  ifTrueSome,
  isNone,
  isSome,
  none,
  some,
  someOrElse,
  someOrError,
} from './option';

describe('option', () => {
  describe('some', () => {
    it('should work', () => {
      expect(some('val')).toMatchObject({ valid: true, value: 'val' });
    });
  });

  describe('none', () => {
    it('should work', () => {
      expect(none()).toMatchObject({ valid: false });
    });
  });

  describe('isSome', () => {
    it('should work', () => {
      expect(isSome(some('val'))).toBeTruthy();
      expect(isSome(none())).toBeFalsy();
    });
  });

  describe('isNone', () => {
    it('should work', () => {
      expect(isNone(some('val'))).toBeFalsy();
      expect(isNone(none())).toBeTruthy();
    });
  });

  describe('someOrElse', () => {
    it('should work', () => {
      expect(someOrElse(some('val'), 'val2')).toEqual('val');
      expect(someOrElse(none(), 'val2')).toEqual('val2');
    });
  });

  describe('someOrError', () => {
    it('should work', () => {
      expect(someOrError(some('val'), 'val2')).toEqual('val');
      expect(() => someOrError(none(), 'val2')).toThrow();
    });
  });

  describe('ifTrueSome', () => {
    it('should work', () => {
      expect(ifTrueSome(true, 'val')).toMatchObject(some('val'));
      expect(ifTrueSome(false, 'val')).toMatchObject(none());
    });
  });
});

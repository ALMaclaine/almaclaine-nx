import {
  getUuid,
  getUuidEnd,
  getUuidStart,
  isUuid,
  isUuidEnd,
  isUuidStart,
  uuid,
} from './uuid';
import { none, some } from '@almaclaine/option';

describe('uuid', () => {
  describe('isUuid', () => {
    it('should work', () => {
      expect(isUuid('awd 14b75a81-056e-4105-9763-9cb1a36d4e88')).toBeTruthy();
      expect(isUuid('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')).toBeTruthy();
      expect(
        isUuid('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toBeTruthy();
      expect(isUuid('14b75a81-056e-4105-9763-9cb1a36d4e88')).toBeTruthy();
      expect(isUuid('14b75a81-056e-4105-9763-9cb1a36d4e8')).toBeFalsy();
      expect(isUuid('ewfs')).toBeFalsy();
      expect(isUuid('')).toBeFalsy();
    });
  });

  describe('isUuidStart', () => {
    it('should work', () => {
      expect(isUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e88')).toBeTruthy();
      expect(
        isUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')
      ).toBeTruthy();
      expect(
        isUuidStart('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toBeFalsy();
      expect(isUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e88')).toBeTruthy();
      expect(isUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e8')).toBeFalsy();
      expect(isUuidStart('ewfs')).toBeFalsy();
      expect(isUuidStart('')).toBeFalsy();
    });
  });

  describe('isUuidEnd', () => {
    it('should work', () => {
      expect(
        isUuidEnd('awd 14b75a81-056e-4105-9763-9cb1a36d4e88')
      ).toBeTruthy();
      expect(
        isUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')
      ).toBeFalsy();
      expect(
        isUuidEnd('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toBeFalsy();
      expect(isUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e88')).toBeTruthy();
      expect(isUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e8')).toBeFalsy();
      expect(isUuidEnd('ewfs')).toBeFalsy();
      expect(isUuidEnd('')).toBeFalsy();
    });
  });

  describe('getUuid', () => {
    it('should work', () => {
      expect(getUuid('awd 14b75a81-056e-4105-9763-9cb1a36d4e88')).toMatchObject(
        some('14b75a81-056e-4105-9763-9cb1a36d4e88')
      );
      expect(
        getUuid('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')
      ).toMatchObject(some('14b75a81-056e-4105-9763-9cb1a36d4e88'));
      expect(
        getUuid('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toMatchObject(some('14b75a81-056e-4105-9763-9cb1a36d4e88'));
      expect(getUuid('14b75a81-056e-4105-9763-9cb1a36d4e88')).toMatchObject(
        some('14b75a81-056e-4105-9763-9cb1a36d4e88')
      );
      expect(getUuid('14b75a81-056e-4105-9763-9cb1a36d4e8')).toEqual(none());
      expect(getUuid('ewfs')).toEqual(none());
      expect(getUuid('')).toEqual(none());
    });
  });

  describe('getUuidStart', () => {
    it('should work', () => {
      expect(getUuidStart('awd 14b75a81-056e-4105-9763-9cb1a36d4e88')).toEqual(
        none()
      );
      expect(
        getUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')
      ).toMatchObject(some('14b75a81-056e-4105-9763-9cb1a36d4e88'));
      expect(
        getUuidStart('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toEqual(none());
      expect(
        getUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e88')
      ).toMatchObject(some('14b75a81-056e-4105-9763-9cb1a36d4e88'));
      expect(getUuidStart('14b75a81-056e-4105-9763-9cb1a36d4e8')).toEqual(
        none()
      );
      expect(getUuidStart('ewfs')).toEqual(none());
      expect(getUuidStart('')).toEqual(none());
    });
  });

  describe('getUuidEnd', () => {
    it('should work', () => {
      expect(
        getUuidEnd('awd 14b75a81-056e-4105-9763-9cb1a36d4e88')
      ).toMatchObject(some('14b75a81-056e-4105-9763-9cb1a36d4e88'));
      expect(getUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e88 awdd')).toEqual(
        none()
      );
      expect(
        getUuidEnd('awd 14b75a81-056e-4105-9763-9cb1a36d4e88 hdf')
      ).toEqual(none());
      expect(getUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e88')).toMatchObject(
        some('14b75a81-056e-4105-9763-9cb1a36d4e88')
      );
      expect(getUuidEnd('14b75a81-056e-4105-9763-9cb1a36d4e8')).toEqual(none());
      expect(getUuidEnd('ewfs')).toEqual(none());
      expect(getUuidEnd('')).toEqual(none());
    });
  });

  describe('uuid', () => {
    it('should work', () => {
      expect(isUuid(uuid())).toBeTruthy();
    });
  });
});

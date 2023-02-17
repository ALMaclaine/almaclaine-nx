import type { Option } from '@almaclaine/option';
import { none, some } from '@almaclaine/option';
import { v4 as uuid } from 'uuid';

const UUID_START_REGEX =
  /^([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})/;

const UUID_END_REGEX =
  /([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/;

const UUID_REGEX =
  /([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})/;

const isUuidStart = (str: string): boolean => {
  return UUID_START_REGEX.test(str);
};

const isUuidEnd = (str: string): boolean => {
  return UUID_END_REGEX.test(str);
};

const isUuid = (str: string): boolean => {
  return UUID_REGEX.test(str);
};

const getUuidBase = (str: string, reg: RegExp): Option<string> => {
  const match = reg.exec(str);
  if (!match) {
    return none();
  }
  return some(match[1]);
};

const getUuidStart = (str: string): Option<string> => {
  if (!isUuidStart(str)) {
    return none();
  }
  return getUuidBase(str, UUID_START_REGEX);
};

const getUuidEnd = (str: string): Option<string> => {
  if (!isUuidEnd(str)) {
    return none();
  }
  return getUuidBase(str, UUID_END_REGEX);
};

const getUuid = (str: string): Option<string> => {
  if (!isUuid(str)) {
    return none();
  }
  return getUuidBase(str, UUID_REGEX);
};

export {
  getUuid,
  getUuidEnd,
  getUuidStart,
  isUuid,
  isUuidEnd,
  isUuidStart,
  uuid,
};

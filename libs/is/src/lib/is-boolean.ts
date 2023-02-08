import { isKind } from './is-kind';

const isBoolean = (val: unknown): val is boolean => {
  return isKind(val, 'Boolean');
};
export { isBoolean };

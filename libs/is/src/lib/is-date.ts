import { isKind } from './is-kind';

const isDate = (val: unknown): val is Date => {
  return isKind(val, 'Date');
};
export { isDate };

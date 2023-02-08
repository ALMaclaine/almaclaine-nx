import { getKindOf } from './get-kind-of';

const isKind = (val: unknown, kind: string): boolean => {
  return getKindOf(val) === kind;
};
export { isKind };

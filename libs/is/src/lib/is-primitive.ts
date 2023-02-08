import { isNull } from './is-null';

const isPrimitive = (
  val: unknown
): val is number | string | boolean | undefined | null => {
  // Using switch fallthrough because it's simple to read and is
  // generally fast: http://jsperf.com/testing-value-is-primitive/5
  switch (typeof val) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined':
      return true;
  }

  return isNull(val);
};
export { isPrimitive };

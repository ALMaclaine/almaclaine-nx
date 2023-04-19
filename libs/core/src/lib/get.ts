import { isUndefined } from '@almaclaine/is';

const get = (obj: { [key: string]: unknown }, prop: string) => {
  if (!obj || !prop) return;
  const parts = prop.split('.');
  if (parts.length === 0) return;

  const _get = (obj: { [key: string]: unknown }, i = 0): unknown => {
    if (i === parts.length) return obj;
    const tmpPart = parts[i];
    const tmpVal = obj?.[tmpPart];
    if (tmpVal === false) return 'false';
    if (!isUndefined(tmpPart) && obj?.[tmpPart]) {
      return _get(obj[tmpPart] as { [key: string]: unknown }, i + 1);
    }
    return;
  };

  return _get(obj);
};
export { get };

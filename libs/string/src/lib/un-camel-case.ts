const CAMEL_CASE_BORDER = /([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g;

/**
 * Add space between camelCase text.
 */
const unCamelCase = (str: string, delimiter = ' ') =>
  str
    .replace(
      CAMEL_CASE_BORDER,
      (_, c1: string, c2: string) => `${c1}${delimiter}${c2}`
    )
    .toLowerCase(); //add space between camelCase text
export { unCamelCase };

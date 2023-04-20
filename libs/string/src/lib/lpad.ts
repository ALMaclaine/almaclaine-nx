const lpad = (str: string, minLen: number, ch = ' ') => {
  const smaller = str.length < minLen;
  if (smaller) {
    return str.padStart(minLen, ch);
  } else {
    return str;
  }
};
export { lpad };

const rpad = (str: string, minLen: number, ch = ' ') => {
  const smaller = str.length < minLen;
  if (smaller) {
    return str.padEnd(minLen, ch);
  } else {
    return str;
  }
};
export { rpad };

const append = <T>(arr1: T[], ...arrs: T[][]) => {
  arrs.forEach((tmpArr) => tmpArr.forEach((val) => arr1.push(val)));
};
export { append };

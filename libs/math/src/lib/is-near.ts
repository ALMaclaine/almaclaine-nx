function isNear(val: number, target: number, threshold = 0) {
  return Math.abs(val - target) <= threshold;
}

export { isNear };

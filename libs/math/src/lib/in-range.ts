function inRange(val: number, min: number, max: number, threshold = 0) {
  const sum = val + threshold;
  const diff = val - threshold;
  return sum >= min && diff <= max;
}

export { inRange };

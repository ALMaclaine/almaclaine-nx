// wraps value around either extreme
function overflow(val: number, min = 0, max = 1) {
  const difference = max - min;
  if (val < min) {
    val += difference * (~~((min - val) / difference) + 1);
  }

  return min + ((val - min) % difference);
}

export { overflow };

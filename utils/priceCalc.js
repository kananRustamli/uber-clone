export const priceCalc = (duration, multiplier) => {
  return ((duration / 200) * multiplier).toFixed(2);
};

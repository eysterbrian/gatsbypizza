// Assuming the base price is for a M (medium) pizza, 
// these are the multipliers for calculating price for 
// other pizza sizes
const sizePriceMultiplier = {
  S: 0.75,
  M: 1,
  L: 1.25
}
export default function calcPizzaPrice(medPrice, size) {
  return Math.ceil(medPrice * sizePriceMultiplier[size]);
}
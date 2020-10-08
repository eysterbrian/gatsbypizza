const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default function formatMoney(priceCents) {
  return formatter(priceCents / 100);
}
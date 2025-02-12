export function describeQuantity(amount: number, measure: string) {
  return `${amount} ${measure}${amount !== 1 ? 's' : ''}`;
}

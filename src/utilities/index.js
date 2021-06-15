/**
 * @function formatCurrency
 * Format number as currency
 *
 * @param {number} amount
 * @returns { string } number formatted as currency
 *
 * @example
 *  formatCurrency(0) => $0.00
 *  formatCurrency(1.5) => $1.50
 */

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

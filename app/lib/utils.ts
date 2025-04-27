/**
 * Formats a number to a consistent precision for both server and client
 * @param num The number to format
 * @param precision The number of decimal places (default: 2)
 * @returns The formatted number as a string
 */
export const formatNumber = (num: number, precision: number = 2): string => {
  return num.toFixed(precision);
}; 
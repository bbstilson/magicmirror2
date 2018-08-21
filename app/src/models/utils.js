/**
 * Used for dynamically generating a relative display size by taking a divisor, returning a curried
 * function to be called with what ever size the current display is.
 *
 * @param {number} - The number to divide the display size by.
 * @return {function} - A curried function.
 * @param {number} - The display size (width or height).
 */

export function getValueByDividingBy (divisor: number): Function {
  return (displayDimension: number) => displayDimension / divisor;
}

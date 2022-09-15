/**
 * Appends the rem unit suffix to a number.
 *
 * @param {number} n
 * @return {string}
 * @example
 * rem(10) // "10rem"
 */
export function rem(n) {
	return `${n}rem`;
}

/**
 * Converts a number from pixel to rem and adds the unit suffix.
 *
 * @param {number} pixel
 * @param {number} rootFontSize
 * @return {string}
 * @example
 * pxToRem(16) // "1rem"
 */
export function pxToRem(pixel, rootFontSize = 16) {
	return rem(pixel / rootFontSize);
}

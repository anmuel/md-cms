/**
 * Strip all newlines from the given value
 *
 * @param {String} val
 * @return {String}
 * @api public
 */
export default function whitespaceRemove(val: string): string {
  return val.replace(/( )/gm, "");
}

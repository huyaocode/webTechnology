import isArguments from '../lang/isArguments.js'

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol])
}

export default isFlattenable

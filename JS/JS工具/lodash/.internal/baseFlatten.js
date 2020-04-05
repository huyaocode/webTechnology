import isFlattenable from './isFlattenable.js'

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion 递归 depth. 
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}

// let arr = []
// baseFlatten([1,2,3,[4,5,[6],7],8],1, false,false,arr )
// console.log(arr)
// -> [ 1, 2, 3, 4, 5, [ 6 ], 7, 8 ]

// baseFlatten([1,2,3,[4,5,[6],7],8], 2, false,false,arr )
// console.log(arr)
// //->   [ 1, 2, 3, 4, 5, 6, 7, 8 ] 

export default baseFlatten

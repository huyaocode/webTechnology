import baseFindIndex from '../.internal/baseFindIndex.js'
import toInteger from '../lang/toInteger'

/**
 * This method is like `findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @see find, findIndex, findKey, findLast, findLastKey
 */
function findndex(array, predicate, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length || fromIndex >= length ) {
    return -1
  }
  let index = 0
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex)
    index = fromIndex < 0 && 0
  }
  return baseFindIndex(array, predicate, index, false)
}

export default findndex

//  const users = [
//    { 'user': 'barney',  'active': true },
//    { 'user': 'fred',    'active': false },
//    { 'user': 'pebbles', 'active': false }
//  ]

// console.log(findndex(users, ({ user }) => user == 'pebbles'))

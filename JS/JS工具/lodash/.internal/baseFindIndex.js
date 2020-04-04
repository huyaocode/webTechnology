/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect. 要检查的数组
 * @param {Function} predicate The function invoked per iteration. 每次迭代调用的函数
 * @param {number} fromIndex The index to search from.  要从中搜索的索引。
 * @param {boolean} [fromRight] Specify iterating from right to left.  指定从右到左的迭代。
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}

export default baseFindIndex

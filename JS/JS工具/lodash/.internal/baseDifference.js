import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../collection/map.js'
import cacheHas from './cacheHas.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200


/**
 * 将不存在于 values 中的 array 元素返回。
 * 
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude. 要排除的值
 * @param {Function} [iteratee] The iteratee invoked per element.  每个元素调用的迭代器。
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

export default baseDifference

/**
下面来举个例子讲一下 baseDifference([1, 2], [2, 3, 4]) 这里 array = [1, 2] , values = [2, 3, 4]
初始值 result = [], valuesLength = 3

for 遍历，第一个值 value = 1， computed = 1, valuesIndex = 3;
values[2] = 4 !== value, values[1] = 3 !== value, values[0] = 2 !== value
三个都没触发 continue, 所以result = [1]

接下来，遍历第二个值， value = 2, computed = 2, vlauesIndex = 3;
values[2] = 4 !== value, values[1] = 3 !== value, values[0] = 2 == value
当存在值相等的时候，直接跳转到最外层，所以 result = [1]
baseDifference([1, 2], [2, 3, 4]) = [1];
*/
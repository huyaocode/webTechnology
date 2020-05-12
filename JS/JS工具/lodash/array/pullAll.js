import basePullAll from '../.internal/basePullAll.js'

/**
 * 这个方法类似_.pull，区别是这个方法接收一个要移除值的数组。
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(array, ['a', 'c'])
 * console.log(array)
 * // => ['b', 'b']
 */
function pullAll(array, values) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values)
    : array
}

export default pullAll

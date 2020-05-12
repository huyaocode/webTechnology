import pullAll from './pullAll.js'

/**
 * 移除数组array中所有和给定值相等的元素
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pull(array, 'a', 'c')
 * // => ['b', 'b']
 */
function pull(array, ...values) {
  return pullAll(array, values)
}

export default pull

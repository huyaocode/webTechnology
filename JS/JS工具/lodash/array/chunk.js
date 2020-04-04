import slice from './slice'
import toInteger from '../lang/toInteger'

/**
 * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */

const chunk = (array, size = 1) => {
  // 取绝对值
  size = Math.max(toInteger(size), 0);
  const length = array == null ? 0 : array.length;
  if (size < 1 || length === 0) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size));
  }
  
  return result;
};

export default chunk

console.log(chunk(['a', 'b', 'c', 'd'], 2));
// => [['a', 'b'], ['c', 'd']]

// chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

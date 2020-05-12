import baseFindIndex from '../.internal/baseFindIndex.js'
import baseIsNaN from '../.internal/baseIsNaN.js'
import strictLastIndexOf from '../.internal/strictLastIndexOf.js'
import toInteger from '../lang/toInteger.js'

function lastIndexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length;
  if(!length) {
    return -1;
  }
  let index = length
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex)
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1)
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true)
}

export default lastIndexOf
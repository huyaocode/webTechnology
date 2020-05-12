import basePullAll from './.internal/basePullAll.js'

/**
 *
 * const array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }]
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], isEqual)
 * console.log(array)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
function pullAllWith(array, values, comparator) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, undefined, comparator)
    : array
}

export default pullAllWith

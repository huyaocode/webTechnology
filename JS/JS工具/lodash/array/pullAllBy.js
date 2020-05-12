import basePullAll from '../.internal/basePullAll.js'

/**
 * 
 * const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x')
 * console.log(array)
 * // => [{ 'x': 2 }]
 */
function pullAllBy(array, values, iteratee) {
  return (array && array.length && values && values.length)
    ? basePullAll(array, values, getIteratee(iteratee, 2))
    : array;
}

// export default pullAllBy

var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);

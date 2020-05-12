import map from '../collection/map'
import baseIntersection from '../.internal/baseIntersection.js'
import castArrayLikeObject from '../.internal/castArrayLikeObject.js'
import last from './last.js'

/**
  var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
  var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
  
  _.intersectionWith(objects, others, _.isEqual);
  // => [{ 'x': 1, 'y': 2 }]
 */

function intersectionWith(...arrays) {
  let comparator = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  comparator = typeof comparator === 'function' ? comparator : undefined
  if (comparator) {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, undefined, comparator)
    : []
}

export default intersectionWith
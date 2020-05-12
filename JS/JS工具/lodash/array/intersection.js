import map from '../collection/map'
import baseIntersection from '../.internal/baseIntersection.js'
import castArrayLikeObject from '../.internal/castArrayLikeObject.js'

/**
 * 求数组交集
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
function intersection(...arrays) {
  const mapped = map(arrays, castArrayLikeObject)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}

export default intersection

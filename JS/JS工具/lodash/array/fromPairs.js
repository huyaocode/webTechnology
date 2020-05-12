/**
  _.fromPairs([['fred', 30], ['barney', 40]]);
  // => { 'fred': 30, 'barney': 40 }
 */

function fromPairs(pairs) {
  let index = -1,
    length = pairs == null ? 0 : pairs.length,
    result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }

  return result;
}

export default fromPairs;

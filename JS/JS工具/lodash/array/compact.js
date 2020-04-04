/**
 * 生成新数组
 * 新数组不包含旧数组中假值（falsey）
 * false, null, 0, "", undefined, and NaN
 */

function compact(array) {
  
  const result = [];
  if(array == null) {
    return result;
  }

  for(const value of array) {
    if(value) {
      result.push(value);
    }
  }

  return result;
}

export default compact;
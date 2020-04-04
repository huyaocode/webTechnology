import toNumber from './toNumber'

const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e+308

// 转换 value 为一个有限数字。
function toFinite(value) {
  /**
    !value,只有7种情况会为真
    NaN null undefined 0 -0 false ''
  */
  if(!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value);
  if(value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0  // 将NaN 转为0
}

export default toFinite
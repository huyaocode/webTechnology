import isObject from 'isObject'
import isSymbol from 'isSymbol'

/**
 * 转换 value 为一个有限数字。
 */

/** NaN 常量 */
const NAN = 0 / 0

/** 匹配前导空格和尾随空格。 */
const reTrim = /^\s+|\s+$/g

/** 检测错误的有符号十六进制字符串值 */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** 检测二进制字符串值 */
const reIsBinary = /^0b[01]+$/i

/** 检测八进制字符串值 */
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt


function toNumber(value) {
  if(typeof value === 'number') {
    return value
  }

  if(isSymbol(value)){
    return NaN
  }

  if(isObject) 

  {
   const other = typeof value === 'function' ? value.valueOf() : value;
   value = isObject(other) ? `${value}` : other;
  }

  if(typeof value !=='string') {
    return  value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

export default toNumbe
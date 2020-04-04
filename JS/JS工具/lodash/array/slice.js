/**
 * slice 切片
 * @param {*} array 
 * @param {*} start 
 * @param {*} end 
 */

function slice(array, start, end) {
  
  let length = array == null ? 0 : array.length;
  if(!length) {
    return []
  }
  start = start == null ? 0 : start;
  end = end === undefined ? length : end;

  if( start < 0) {
    start = -start > length ? 0 : ( length - start)
  }
  end = end > length ? length : end;

  length = start > end ?  0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1;
  const result = new Array(length)

  while(++ index < length) {
    result[index] = array[index + start]
  }

  return result;
}

export default slice



/**
 * >>>是无符号右移，>>是有符号移位
 * x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0。
 *  参考： https://segmentfault.com/a/1190000014613703
 * 
 * x >>>= 0 就相当于 x = x >>> 0
 * 
 * (5.5 - 1.2) >>> 0  结果为 4
 * (2 - 5) >>> 0  结果为 4294967293
 */
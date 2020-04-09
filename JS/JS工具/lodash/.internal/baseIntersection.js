import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'//判断数组是否包含给定值
import arrayIncludesWith from './arrayIncludesWith.js'//类似于数组的includes方法，区别是它的comparator需要作为参数传入
import map from '../collection/map'
import cacheHas from './cacheHas.js'

/**
 * The base implementation of methods like `intersection` that accepts an
 * array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
//取数组交集方法intersection的基础实现
//arrays需要取交集的数组组成的数组，iteratee循环时每个元素调用的迭代器，comparator比较器

// 举例：传入参数[[1,2,3], [0,3,5],[1,3,5]],  a => a

function baseIntersection(arrays, iteratee, comparator) {
  const includes = comparator ? arrayIncludesWith : arrayIncludes
  //判断数组是否包含给定值
  const length = arrays[0].length//第一个数组的长度
  const othLength = arrays.length//所有需要比较的数组有多少个
  const caches = new Array(othLength)//创建一个和需要比较的数组的数量一样长度的数组来做缓存
  const result = []//结果数组

  let array
  let maxLength = Infinity
  let othIndex = othLength//循环arrays的索引

  while (othIndex--) {
    array = arrays[othIndex]//当前数组
    if (othIndex && iteratee) {//如果传递了迭代器参数，就循环当前数组为其中每个元素执行迭代器
      array = map(array, (value) => iteratee(value))
    }
    maxLength = Math.min(array.length, maxLength)//array.length和Infinity中取一个小值，要获取到一个结果数组的最大长度后面有用
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array) // othIndex 等于 0 时，没有初始值
      : undefined
      //缓存数组处理
      //如果没有comparator，并且有iteratee或者第一个数组和当前循环到的数组的长度大于等于120，就开启缓存
      //开启缓存的时候，caches[othIndex]，caches的当前值赋值为一个SetCache对象，传递当前循环到的数组作为参数
      //不开启缓存，就存一个undefined
  }
  array = arrays[0]//第一个数组，用于取交集的次序的根据

  // console.log('arrays: ', arrays)
  // console.log('caches: ', caches)

  /**
   * caches:
   * [{空}, {0,3,5}, {1,3,5}]
   */

  let index = -1//循环索引
  const seen = caches[0]// 缓存已确认为交集元素的数组

  outer://标签语句，循环跳出时会跳到这里
  while (++index < length && result.length < maxLength) {
    //循环第一个数组，第二个条件是结果数组的长度不能超过最大长度
    let value = array[index]//第一个数组的当前循环元素
    // computed 为用于比较的元素
    const computed = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0//处理value为0的情况，因为可能还有+0，-0之类的元素值
  
    // cacheHas(seen, computed) 用于验证 computed 是否已经存在于交集缓存中
    // includes(result, computed, comparator)  用于验证 computed 是否已经存在于交集数组中
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength//需要比较的数组长度，作为循环索引
      while (--othIndex) {//循环需要比较的数组
        const cache = caches[othIndex]//当前循环到的数组的缓存
        if (!(cache
              ? cacheHas(cache, computed) // 判断 computed 是否存在于其他数组做成的缓存中
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer
        }
      }
      // 使用对象方式存储计算好的
      if (seen) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}

export default baseIntersection

// console.log(baseIntersection([[1,2,3,2, 3], [0,3,5],[1,3,5]], a => a));
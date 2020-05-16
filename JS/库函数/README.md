JavaScript 工具函数

此篇文档目的为：**学习 30s-js 的写法，记住 lodash 有哪些方法**。

参考链接：https://www.30secondsofcode.org/js/p/1/

[JavaScript 数组函数整理](https://github.com/huyaocode/webKnowledge/blob/master/JS基础/全局内置对象.md#数组Array对象常用方法)

- [数组](#%e6%95%b0%e7%bb%84)
  - [accumulate](#accumulate)
  - [arrayMax](#arraymax)
  - [arrayMin](#arraymin)
  - [\_.chunk](#chunk)
  - [\_.compact](#compact)
  - [countOccurrences](#countoccurrences)
  - [deepFlatten](#deepflatten)
  - [difference](#difference)
  - [distinctValuesOfArray](#distinctvaluesofarray)

## 数组

### accumulate

返回数组中到当前数字的和。

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);

accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```

备注：

- `acc.slice(-1)`的值就是上一次 reduce 添加到数组中的数
- acc 为最后返回的数组，刚开始时这个数组为空，然后每次 reduce 都会把 nums 数组中的一个数加上之前累积数组中的最后一个数添加到数组中

### arrayMax

数组中最大值

```js
const arrayMax = (arr) => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10
```

### arrayMin

数组中最小值

```js
const arrayMin = (arr) => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

### \_.chunk

将数组块划分为指定大小的较小数组。

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  );
```

备注：`Array.from(arrayLike[, mapFn[, thisArg]])` 的第一个参数为 arrayLike，所以这里使用了一个含 length 的对象代替，巧妙！

### \_.compact

```js
const compact = (arr) => arr.filter(Boolean);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```

### countOccurrences

计算数组中值的出现次数。

```js
const countOccurrences = (arr, value) =>
  arr.reduce((acc, v) => (v === value ? acc + 1 : acc), 0);
```

### deepFlatten

把多层数组扁平化。

```js
const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

备注：concat 可同时接受数组与非数组，如果是数组则会取出数组中元素

```js
[].concat(1, [2], [3, 4], 5);
// -> [1, 2, 3, 4, 5]
```

### difference

找出 a 中不包含于 b 数组中的元素。

从 b 创建 Set, 然后使用 Array.filter() on 只保留 a b 中不包含的值.

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
// difference([1,2,3], [1,2,4]) -> [3]
```

### distinctValuesOfArray

去掉数组中重复的值.

```js
const distinctValuesOfArray = (arr) => [...new Set(arr)];
// distinctValuesOfArray([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

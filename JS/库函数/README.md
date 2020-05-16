JavaScript 工具函数

此篇文档目的为：**学习 30s-js 的写法，记住 lodash 有哪些方法**。

参考链接：https://www.30secondsofcode.org/js/p/1/

[JavaScript 数组函数整理](https://github.com/huyaocode/webKnowledge/blob/master/JS基础/全局内置对象.md#数组Array对象常用方法)

- [数组](#%e6%95%b0%e7%bb%84)
  - [accumulate](#accumulate)
  - [arrayMax](#arraymax)
  - [arrayMin](#arraymin)
  - [aperture](#aperture)
  - [arrayToCSV - 数组转 CSV](#arraytocsv---%e6%95%b0%e7%bb%84%e8%bd%ac-csv)
  - [ary](#ary)
  - [atob - base-64 转正常的 string](#atob---base-64-%e8%bd%ac%e6%ad%a3%e5%b8%b8%e7%9a%84-string)
  - [attempt](#attempt)
  - [average - 求平均数](#average---%e6%b1%82%e5%b9%b3%e5%9d%87%e6%95%b0)
  - [averageBy - 函数结果的平均数](#averageby---%e5%87%bd%e6%95%b0%e7%bb%93%e6%9e%9c%e7%9a%84%e5%b9%b3%e5%9d%87%e6%95%b0)
  - [bifurcateBy - 通过函数将数组分为两部分](#bifurcateby---%e9%80%9a%e8%bf%87%e5%87%bd%e6%95%b0%e5%b0%86%e6%95%b0%e7%bb%84%e5%88%86%e4%b8%ba%e4%b8%a4%e9%83%a8%e5%88%86)
  - [\_.chunk - 切分数组](#chunk---%e5%88%87%e5%88%86%e6%95%b0%e7%bb%84)
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

### aperture

```js
const aperture = (n, arr) =>
  n > arr.length
    ? []
    : arr.slice(n - 1).map((v, i) => {
        console.log(arr.slice(n - 1), v, i, arr.slice(i, i + n - 1));
        return [...arr.slice(i, i + n - 1), v];
      });

aperture(2, [1, 2, 3, 4]); // [[1,2],[2,3],[3,4]]
// console 打印
// [2, 3, 4] 2 0 [1]
// [2, 3, 4] 3 1 [2]
// [2, 3, 4] 4 2 [3]

aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

### arrayToCSV - 数组转 CSV

```js
const arrayToCSV = (arr, delimiter = ",") =>
  arr
    .map((v) =>
      v
        .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter)
    )
    .join("\n");

arrayToCSV([
  ["a", "b"],
  ["c", "d"],
]); // '"a","b"\n"c","d"'
arrayToCSV(
  [
    ["a", "b"],
    ["c", "d"],
  ],
  ";"
); // '"a";"b"\n"c";"d"'
arrayToCSV([
  ["a", '"b" great'],
  ["c", 3.1415],
]); // '"a","""b"" great"\n"c",3.1415'
```

备注：

```js
isNaN("a"); // true
isNaN(3.14); // false
```

### ary

```js
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
// EXAMPLES
const firstTwoMax = ary(Math.max, 2);
[[2, 6, "a"], [6, 4, 8], [10]].map((x) => firstTwoMax(...x)); // [6, 6, 10]
```

### atob - base-64 转正常的 string

```js
const atob = (str) => Buffer.from(str, "base64").toString("binary");
EXAMPLES;
atob("Zm9vYmFy"); // 'foobar'
```

### attempt

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
EXAMPLES;
var elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, ">_>");
if (elements instanceof Error) elements = []; // elements = []
```

### average - 求平均数

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
// EXAMPLES
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

### averageBy - 函数结果的平均数

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;
EXAMPLES;
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5
```

备注: 给 map 函数传的值就是一个函数，在 map 那一行执行结果就是数组中每个值被执行一次的结果

### bifurcateBy - 通过函数将数组分为两部分

备注： 通过 filter[i] 获得是否为 true， 然后再用 0 : 1 来选择到底进哪个数组

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);
// EXAMPLES;
bifurcateBy(["beep", "boop", "foo", "bar"], (x) => x[0] === "b"); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

### \_.chunk - 切分数组

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

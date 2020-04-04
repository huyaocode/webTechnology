# JSON.stringify() 
链接： https://juejin.im/post/5decf09de51d45584d238319

## 九大特性

1. 对于`undefined`、`任意的函数`以及`symbol`时 stringify()在不同情况返回不同的结果。
   1. 作为对象属性值时，将跳过（忽略）对它们进行序列化
   2. 作为数组元素值时，会将它们序列化为 null
   3. 单独的值进行序列化时都会返回 undefined

```js

const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
JSON.stringify(data); 
//-> "{"a":"aaa"}"

JSON.stringify(["aaa", undefined, function aa() {
    return true
  }, Symbol('dd')]) 
//-> "["aaa",null,null,null]"

JSON.stringify(function a (){console.log('a')})
// undefined
JSON.stringify(undefined)
// undefined
JSON.stringify(Symbol('dd'))
// undefined
```

2. 转换值如果有 toJSON() 函数，序列化结果为 toJSON值，并且忽略其他属性的值。

```js
JSON.stringify({
    say: "hello JSON.stringify",
    toJSON: function() {
      return "today i learn";
    }
  })
// -> "today i learn"
```

3. `JSON.stringify()`将会正常序列化`Date`的值。

```js
JSON.stringify({ now: new Date() });
// "{"now":"2019-12-08T07:42:11.973Z"}"
```

4. `NaN`和`Infinity`格式的数值及`null`都会被当做 null

```js
JSON.stringify(NaN)
// "null"
JSON.stringify(null)
// "null"
JSON.stringify(Infinity)
// "null"
```

5. 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

```js
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// "[1,"false",false]"
```

6. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

```js
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'json', enumerable: false }, 
            y: { value: 'stringify', enumerable: true } 
        }
    )
);
// "{"y":"stringify"}"
```

7. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行`JSON.parse(JSON.stringify())`方法，会抛出错误。

```js
/ 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。 
const obj = {
  name: "loopObj"
};
const loopObj = {
  obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;

// 封装一个深拷贝的函数
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// 执行深拷贝，抛出错误
deepClone(obj)
/**
 VM44:9 Uncaught TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'loopObj' -> object with constructor 'Object'
    --- property 'obj' closes the circle
    at JSON.stringify (<anonymous>)
    at deepClone (<anonymous>:9:26)
    at <anonymous>:11:13
 */
```

8. 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

```js
JSON.stringify({ [Symbol.for("json")]: "stringify" }, function(k, v) {
    if (typeof k === "symbol") {
      return v;
    }
  })

// undefined
```

## 第一个参数`replacer`
replacer 参数有两种形式，可以是一个函数或者一个数组。
 - 作为函数时，它有两个参数，键（key）和值（value），函数类似就是数组方法 map、filter 等方法的回调函数，对每一个属性值都会执行一次该函数。
 - 作为数组时，数组的值代表将被序列化成 JSON 字符串的属性名。

```js
const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
JSON.stringify(data); 
// "{"a":"aaa"}"

// 使用 replacer 参数作为函数时
JSON.stringify(data, (key, value) => {
  switch (true) {
    case typeof value === "undefined":
      return "undefined";
    case typeof value === "symbol":
      return value.toString();
    case typeof value === "function":
      return value.toString();
    default:
      break;
  }
  return value;
})

// "{"a":"aaa","b":"undefined","c":"Symbol(dd)","fn":"function() {\n    return true;\n  }"}"
```

### 传入 replacer 函数的第一个参数特别
replacer 被传入的函数时，第一个参数不是对象的第一个键值对，而是空字符串作为 key 值，value 值是整个对象的键值对。

```js
const data = {
  a: 2,
  b: 3,
  c: 4,
  d: 5
};
JSON.stringify(data, (key, value) => {
  console.log(value);
  return value;
})
// 第一个被传入 replacer 函数的是 {"":{a: 2, b: 3, c: 4, d: 5}}
// {a: 2, b: 3, c: 4, d: 5}   
// 2
// 3
// 4
// 5
```

### replacer 作为数组
replacer 作为数组时，只序列化这个数组里的值。

```js
const jsonObj = {
  name: "JSON.stringify",
  params: "obj,replacer,space"
};

// 只保留 params 属性的值
JSON.stringify(jsonObj, ["params"]);
// "{"params":"obj,replacer,space"}" 
```

### 第三个参数`space`
space 参数用来控制结果字符串里面的间距。

除了好看没啥特别的用处。我们用 \t、 \n 等缩进能让输出更加格式化，更适于观看。
```js
const tiedan = {
  name: "同学",
  describe: "今天在学 JSON.stringify()",
  emotion: "like shit"
};

JSON.stringify(tiedan, null, "🐷");
// "{
// 🐷"name": "同学",
// 🐷"describe": "今天在学 JSON.stringify()",
// 🐷"emotion": "like shit"
// }"

JSON.stringify(tiedan, null, 2);
// "{
//   "name": "同学",
//   "describe": "今天在学 JSON.stringify()",
//   "emotion": "like shit"
// }"
```
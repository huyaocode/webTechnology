# CSS 变量

- [阮一峰-CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)
- [妙用 CSS 变量](https://juejin.im/post/5e5d0f2ef265da5756325bb9)

## 语法

### 变量的声明

- 变量前加`--`
- 变量名大小写敏感
  - `--header-color`和`--Header-Color`是两个不同变量

```css
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: 0.35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```

### var()

- 用于读取变量
- 第二个参数，表示变量的默认值
  - 第二个参数不处理内部的逗号或空格，都视作参数的一部分
- 变量值只能用作属性值，不能用作属性名

```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}

color: var(--foo, #7f583f);
```

### 变量值类型

- 如果变量值是一个字符串，可以与其他字符串拼接
  - 可用于伪元素`content`
- 数值与单位需要在一起用

```css
 {
  --bar: "hello";
  --foo: var(--bar) " world";
}

.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap) px;
}

.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

### 作用域

- 变量的作用域就是它所在的选择器的有效范围
- 全局的变量通常放在根元素`:root`里面

### 兼容性

- [caniuse](https://www.caniuse.com/#search=css%20var)

可以使用@support 命令进行检测。

```css
@supports ((--a: 0)) {
  /* supported */
}

@supports (not (--a: 0)) {
  /* not supported */
}
```

### JavaScript 操作

检测浏览器是否支持 CSS 变量。

```js
const isSupported =
  window.CSS && window.CSS.supports && window.CSS.supports("--a", 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

JavaScript 操作 CSS 变量的写法如下。

```js
// 设置变量
document.body.style.setProperty("--primary", "#7F583F");

// 读取变量
document.body.style.getPropertyValue("--primary").trim();
// -> '#7F583F'

// 删除变量
document.body.style.removeProperty("--primary");
```

## 应用

### 例子：变换主题颜色

```js
["red", "blue", "green"].forEach((v) => {
  const btn = document.getElementById(`${v}-theme-btn`);
  btn.addEventListener("click", () =>
    document.body.style.setProperty("--bg-color", v)
  );
});
```

### CSS 使用变量的好处

- 减少样式代码的重复性
- 增加样式代码的扩展性
- 提高样式代码的灵活性
- 增多一种 CSS 与 JS 的通讯方式
- 不用深层遍历 DOM 改变某个样式

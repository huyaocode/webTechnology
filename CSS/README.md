
### antialiased

 `-webkit-font-smoothing: antialiased;` 这个属性可以使页面上的字体抗锯齿,使用后字体看起来会更清晰。

 在实际使用中发现他可以使字体的字重看起来变得更小。即让 `font-weight: 500;` 的文字看起来像是 `font-weight: 500;`

` -webkit-font-smoothing`它有三个属性值：
 - `none` —— 对低像素的文本比较好
 - `subpixel-antialiased`——默认值
 -`antialiased` ——抗锯齿很好

Gecko也推出了自己的抗锯齿效果的非标定义。这个属性也是更清晰的作用。`-moz-osx-font-smoothing: inherit | grayscale;`

参考： https://www.jianshu.com/p/3ced7a7893be


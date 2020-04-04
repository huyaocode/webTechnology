# webTechnology
web 工程中的问题解决方法、进阶的知识，是偏向实用的、非基础的，内容的来源是从网上收藏一些文章并分类整理。


### node 中调试运行 es6 方法
因为直接使用node 运行代码，会不认识 import/export 语法，需要 babel 
```
// 运行方法：
babel-node xxx.js
```

#### 如何配置
```
// 全局安装
npm install babel-cli -g

// 在项目中安装 babel-preset-es2015
npm install babel-preset-es2015 
```
在项目中添加`.babelrc`文件
```js
{
  "presets": [
      "es2015"
  ],
  "plugins": []
}
```

运行 xxx.js：
```
babel-node xxx.js
```
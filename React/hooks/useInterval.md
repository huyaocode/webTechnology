# useInterval

使用 useInterval：

```js
function Counter() {
  let delay = 1000;
  let [count, setCount] = useState(0);

  useInterval(() => {
    // 你自己的代码
    setCount(count + 1);
  }, delay);

  return <h1>{count}</h1>;
}
```

定义 useInterval：

```js
import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 每次渲染后，保存新的回调到我们的 ref 里。
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

## 优点 - 1： 它的参数是「动态地」

![](https://overreacted.io/35e4f35a8585255b11c090aed9f72433/counter_delay.gif)

可以动态调整 delay 的值

```js
function Counter() {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(1000);

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  // 调整delay值
  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <>
      <h1>{count}</h1>
      <input value={delay} onChange={handleDelayChange} />
    </>
  );
}
```

## 优点 - 2: 可以暂停定时器

```js
function Counter() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  //控制是否暂停
  function handleIsRunningChange(e) {
    setIsRunning(e.target.checked);
  }

  return (
    <>
      <h1>{count}</h1>
      <input
        type="checkbox"
        checked={isRunning}
        onChange={handleIsRunningChange}
      /> Running
      <br />
      <input value={delay} onChange={handleDelayChange} />
    </>
  );
}
```

[demo 地址](https://codesandbox.io/s/l240mp2pm7)

## 优点 3 - 回调函数可变

注意在代码中，专门使用了一个 Ref 来存储回调函数，并在每次渲染后都更新它。

```js
// 每次渲染后，保存新的回调到我们的 ref 里。
useEffect(() => {
  savedCallback.current = callback;
});
```

不替换 interval，而是引入一个指向新 interval 回调的可变 savedCallback

参考：[Dan - 使用 React Hooks 声明 setInterval](https://overreacted.io/zh-hans/making-setinterval-declarative-with-react-hooks/)

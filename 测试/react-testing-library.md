# react-testing-library

## 常用 API

- `toBeInTheDocument()`
- `toHaveClass('class-name')`

## 触发事件

```jsx
fireEvent.click(thirdItem);
```

## 获取测试节点

在 JSX 中添加属性 `data-testid="test-menu"`

获取时：

```tsx
const menuElement: HTMLElement = wrapper.getByTestId("test-menu");
```

## mock 组件/库

```jsx
jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});
```

## 使用 CSS

测试一般无关 css，但是有的 CSS 会控制 DOM 是否存在于页面中，所以也会有测试中需要 css 的时候。

```tsx
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

wrapper.container.append(createStyleFile());
```

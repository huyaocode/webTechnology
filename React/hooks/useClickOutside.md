# useClickOutside

判断点击了其他地方

```tsx
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
```

使用：

```tsx
const componentRef = useRef<HTMLDivElement>(null);

useClickOutside(componentRef, () => {
  // dosometing
});

// JSX
<div ref={componentRef}></div>;
```

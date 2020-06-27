# useDebounce

```tsx
function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
```

使用：

```tsx
const [inputValue, setInputValue] = useState(value as string);

const debouncedValue = useDebounce(inputValue, 500);

useEffect(() => {
  // 配合 useEffect 使用
  // 这里写 value 变化后的副作用
}, [debouncedValue]);
```

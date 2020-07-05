# useWindowSizeWithDebounce

返回页面的宽高信息，支持防抖

```tsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

export const useWindowSizeWithDebounce = (wait: number = 0) => {
  const [size, setSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  // 使用 useMemo 缓存 debounce 后的 setSize，并监听 wait 的变化
  const debouncedSetSize = useMemo(() => {
    return wait > 0 ? debounce(setSize, wait) : setSize;
  }, [wait, setSize]);

  const onResize = useCallback(() => {
    debouncedSetSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }, [debouncedSetSize]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);
  return size;
};

```
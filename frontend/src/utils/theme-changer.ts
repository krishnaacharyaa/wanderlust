import { useLayoutEffect } from 'react';

const useThemeClass = () => {
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    storedTheme === 'dark' && document.documentElement.classList.add('dark');
  }, []);
};

export default useThemeClass;
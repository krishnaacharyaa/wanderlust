import { useLayoutEffect } from 'react';

const useDarkModeClass = () => {
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    storedTheme === 'dark' && document.documentElement.classList.add('dark');
  }, []);
};

export default useDarkModeClass;
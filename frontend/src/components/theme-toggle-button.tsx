import { useLayoutEffect, useState } from 'react';
import Sun from '@/assets/svg/sun.svg';
import Moon from '@/assets/svg/moon.svg';
import useThemeClass from '@/utils/theme-changer';
function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => (prevTheme === null ? true : !prevTheme));
  };
  useLayoutEffect(() => {
    const storedTheme = useThemeClass();
    setIsDarkTheme(storedTheme === 'dark');
  }, []);

  useLayoutEffect(() => {
    if (isDarkTheme !== null) {
      document.documentElement.classList.toggle('dark', isDarkTheme);

      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);
  return (
    <div>
      <button
        name="theme"
        className={`${
          isDarkTheme ? 'bg-dark-theme-background' : 'bg-light-theme-background'
        } flex h-8 w-16 cursor-pointer items-center justify-start rounded-full px-1 py-1`}
        onClick={toggleTheme}
      >
        <div
          className={` ${
            isDarkTheme
              ? 'translate-x-8 bg-dark-theme-foreground'
              : 'translate-x-0 bg-light-theme-foreground'
          } h-6 w-6 rounded-full bg-black px-1 py-1 duration-300`}
        >
          <img src={`${isDarkTheme ? Moon : Sun}`} alt="theme-toggler" />
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;

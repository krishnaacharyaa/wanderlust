const useThemeClass = () => {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark);
  initialTheme && document.documentElement.classList.add('dark');
  if (initialTheme) return 'dark';
  else return 'light';
};

export default useThemeClass;

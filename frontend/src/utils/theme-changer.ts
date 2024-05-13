const useThemeClass = () => {
  const storedTheme = localStorage.getItem('theme');
  storedTheme === 'dark' && document.documentElement.classList.add('dark');
};

export default useThemeClass;

import { useEffect, useState } from 'react';

function ThemeToggle() {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
    const toggleTheme = () => {
      // Toggle between dark and light themes
      setIsDarkTheme((prevTheme) => (prevTheme === null ? true : !prevTheme));
    };
    useEffect(() => {
      // Check if the user has set a theme preference in local storage
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
      // Set initial theme based on local storage or system preference
      setIsDarkTheme(storedTheme === 'dark' || (!storedTheme && prefersDark) || null);
      // Apply dark theme immediately to prevent flickering
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    }, []);
  
    useEffect(() => {
      // Apply dark or light theme based on isDarkTheme state
      if (isDarkTheme !== null) {
        document.documentElement.classList.toggle('dark', isDarkTheme);
        
        // Save the user's theme preference to local storage
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      }
    }, [isDarkTheme]);
  return (
    <div>
      <label htmlFor="theme" className="theme cursor-pointer">  
        <span className="theme__toggle-wrap cursor-pointer">  
          <input id="theme" className="theme__toggle cursor-pointer" readOnly type="checkbox" role="switch" name="theme" value="dark" onClick={toggleTheme} checked={isDarkTheme === true} />  
          {/* <span className="theme__fill"></span>   */}
          <span className="theme__icon">  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
            <span className="theme__icon-part"></span>  
          </span>  
        </span>  
      </label>  
    </div>
  );
}

export default ThemeToggle;

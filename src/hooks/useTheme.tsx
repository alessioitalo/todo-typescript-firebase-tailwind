import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    // check for stored theme
    const storedTheme = localStorage.getItem('theme');
    // if theme, apply
    if (storedTheme) {
      setTheme(storedTheme);
      // if not, default
    } else {
      setTheme('light');
    }
  }, []);

  return { theme, setTheme };
};

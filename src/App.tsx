import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('');

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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const themeChangeHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(localStorage.getItem('theme')!);
  };

  return (
    <main className='h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='w-screen h-48 flex justify-between items-center bg-mobile-light md:bg-desk-light bg-no-repeat bg-cover'>
        <h1 className='text-4xl ml-12 text-white tracking-widest'>TODO</h1>{' '}
        <span
          className='mr-12 w-8 h-8 bg-no-repeat bg-icon-light dark:bg-icon-dark cursor-pointer'
          onClick={themeChangeHandler}
        ></span>
      </header>
      <div className='relative bottom-16 py-5'>
        <AddToDo />
        <Todos />
      </div>
    </main>
  );
}

export default App;

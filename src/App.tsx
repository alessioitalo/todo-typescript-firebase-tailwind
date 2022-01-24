import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';

initializeApp(firebaseConfig);

function App() {
  const [theme, setTheme] = useState<string>('');
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

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

  // const auth = getAuth();
  // console.log(auth);

  return (
    <main className='flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='w-screen h-80 pb-10 flex justify-between items-center bg-mobile-light md:bg-desk-light dark:bg-mobile-dark dark:md:bg-desk-dark bg-no-repeat bg-cover'>
        <h1 className='text-2xl sm:text-4xl ml-4 sm:ml-12 text-white tracking-widest'>
          TODO
        </h1>{' '}
        <span
          className='mr-4 sm:mr-12 w-8 h-8 bg-no-repeat bg-icon-light dark:bg-icon-dark cursor-pointer'
          onClick={themeChangeHandler}
        ></span>
      </header>
      <div className='relative bottom-32 w-[90vw] sm:w-[80vw] md:w-[50vw]  '>
        {userLoggedIn ? (
          <>
            <AddToDo />
            <Todos />
          </>
        ) : (
          <AuthForm setUserLoggedIn={setUserLoggedIn} />
        )}
      </div>
    </main>
  );
}

export default App;

import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TodosContainer from './components/TodosContainer';

initializeApp(firebaseConfig);

function App() {
  const { theme, setTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });

  const themeChangeHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(localStorage.getItem('theme')!);
  };

  return (
    <BrowserRouter>
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
          <Routes>
            <Route
              path='/'
              element={
                <TodosContainer loggedIn={loggedIn}>
                  <AddToDo />
                  <Todos />
                </TodosContainer>
              }
            />
            <Route path='login' element={<AuthForm loggedIn={loggedIn} />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;

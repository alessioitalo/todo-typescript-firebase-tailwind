import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { useTheme } from './hooks/useTheme';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TodosContainer from './components/TodosContainer';
import Spinner from './components/Spinner';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase.config';

initializeApp(firebaseConfig);

export interface todosInterface {
  id: string;
  data: { user: string; todo: string; completed: boolean; time: Date };
}

function App() {
  const { theme, setTheme } = useTheme();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [todos, setTodos] = useState<todosInterface[]>();

  const [uid, setUid] = useState<string>('');

  const themeChangeHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(localStorage.getItem('theme')!);
  };

  const fetchTodos = async () => {
    let todosArray: any[] = [];
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('user', '==', uid));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      return todosArray.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log(todosArray)
    setTodos(todosArray);
  };

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
        setUid(user.uid);
      } else {
        setLoggedIn(false);
        setUid('');
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 300);
  });

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
      {loading ? (
        <Spinner />
      ) : loggedIn ? (
        <div className='relative -top-28 w-[90vw] sm:w-[80vw] md:w-[50vw]  '>
          <TodosContainer setLoggedIn={setLoggedIn}>
            <AddToDo uid={uid} fetchTodos={fetchTodos} />
            <Todos uid={uid} todos={todos} fetchTodos={fetchTodos} setTodos={setTodos}/>
          </TodosContainer>
        </div>
      ) : (
        <div className='relative bottom-32 w-[90vw] sm:w-[80vw] md:w-[50vw]'>
          <AuthForm />
        </div>
      )}
    </main>
  );
}

export default App;

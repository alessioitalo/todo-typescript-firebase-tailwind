import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

interface TodosContainerProps {
  children: React.ReactNode;
  loggedIn: boolean;
}

const TodosContainer = ({ children, loggedIn }: TodosContainerProps) => {
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  });

  const signOutHandler = async () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {children}
      <div>
        <h1 className='text-slate-700 dark:text-gray-200'>
          Currently logged in as {auth.currentUser?.email}
        </h1>
        <button
          className='text-slate-700 dark:text-gray-200 hover:text-gray-200 hover:bg-slate-700 mt-3 dark:hover:text-slate-700 dark:hover:bg-gray-200 border-2 border-slate-700 dark:border-gray-200 rounded cursor-pointer px-2 py-1'
          onClick={signOutHandler}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default TodosContainer;

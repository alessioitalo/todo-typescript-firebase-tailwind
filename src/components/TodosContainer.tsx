import { getAuth, signOut } from 'firebase/auth';

interface TodosContainerProps {
  children: React.ReactNode;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodosContainer = ({ children, setLoggedIn }: TodosContainerProps) => {

  const auth = getAuth();


  const signOutHandler = async () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
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

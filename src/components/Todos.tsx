import { getAuth, signOut } from 'firebase/auth';

const Todos = () => {
  const auth = getAuth();

  const signOutHandler = async () => {
    signOut(auth)
      .then(() => {
        console.log('signing out...')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      });
  };
  return (
    <>
      <div className='bg-white border-2 border-black rounded w-100 my-6 mx-10 h-12'></div>
      {auth.currentUser && (
        <h1>Currently logged in as {auth.currentUser.email}</h1>
      )}
      <h1 onClick={signOutHandler}>sign out</h1>
    </>
  );
};

export default Todos;

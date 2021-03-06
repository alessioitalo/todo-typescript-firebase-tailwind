//react imports
import { useState } from 'react';
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const auth = getAuth();

  // component state checking if user is loggin in or signing up
  const [loginMode, setLoginMode] = useState<boolean>(true);

  //  interface for user information state
  interface authData {
    email: string;
    password: string;
    confirm?: string;
  }

  // initial state for user information
  const [userData, setUserData] = useState<authData>({
    email: '',
    password: '',
  });

  // updating user information state on input change
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // validating and sending auth request to firebase
  const authFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error('Please fill all fields.');
      return;
    }
    if (userData.password.length < 6) {
      toast.error('Please enter at least 6 characters for your password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email.toLowerCase())) {
      toast.error('Please enter a correct email address');
      return;
    }
    if (!loginMode) {
      if (userData.password !== userData.confirm) {
        toast.error('Your passwords do not match.');
        return;
      }
    }
    try {
      if (loginMode) {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      }
    } catch (err) {
      toast.error('Login was unsuccessful: ' + err);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center py-10 rounded text-gray-700 bg-slate-200 dark:bg-gray-700 dark:text-slate-200'>
      <h1 className='text-xl sm:text-3xl font-bold'>
        {loginMode ? 'LOGIN' : 'SIGN UP'}
      </h1>
      <h2>
        or{' '}
        <span
          className='font-bold cursor-pointer'
          onClick={() => setLoginMode(!loginMode)}
        >
          {loginMode ? 'Sign Up' : 'Login'}
        </span>{' '}
        instead
      </h2>
      <form
        onSubmit={authFormSubmitHandler}
        className='flex flex-col px-2 sm:px-12 w-full h-full'
      >
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          className='my-2 text-gray-700 rounded p-2 placeholder:px-2'
          onChange={inputChangeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='Your Password'
          className='my-2 text-gray-700 rounded p-2 placeholder:px-2'
          onChange={inputChangeHandler}
        />
        {!loginMode && (
          <input
            type='password'
            name='confirm'
            placeholder='Confirm Password'
            className='my-2 text-gray-700 rounded p-2 placeholder:px-2'
            onChange={inputChangeHandler}
          />
        )}
        <button className='bg-gray-700 text-slate-200 dark:text-gray-700 dark:bg-slate-200 py-2 my-2 rounded'>
          SUBMIT
        </button>
      </form>
      <p className='px-2 sm:px-12 text-center'>
        For demo purposes, use the following credentials:{' '}
        <i>admin@noemail.com</i> - <i>password1</i>
      </p>
    </div>
  );
};

export default AuthForm;

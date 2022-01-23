import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../firebase.config';
import { initializeApp } from 'firebase/app';

import { useState } from 'react';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const AuthForm = () => {
  const [loginMode, setLoginMode] = useState(true);
  return (
    <div className='flex flex-col justify-center items-center py-10 rounded text-gray-700 bg-slate-200 dark:bg-gray-700 dark:text-slate-200'>
      <h1 className='text-xl sm:text-3xl font-bold'>{loginMode ? 'LOGIN' : 'SIGN UP'}</h1>
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
      <form className='flex flex-col px-2 sm:px-12 w-full h-full'>
        <input
          type='email'
          placeholder='Your Email'
          className='my-2 rounded py-2 placeholder:px-2'
        />
        <input
          type='password'
          placeholder='Your Password'
          className='my-2 rounded py-2 placeholder:px-2'
        />
        {!loginMode && (
          <input
            type='password'
            placeholder='Confirm Password'
            className='my-2 rounded py-2 placeholder:px-2'
          />
        )}
        <button className='bg-gray-700 text-slate-200 dark:text-gray-700 dark:bg-slate-200 py-2 my-2 rounded'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import { firebaseConfig } from '../firebase.config';
// import { initializeApp } from 'firebase/app';
import React, { useState } from 'react';

// const app = initializeApp(firebaseConfig);

const AuthForm = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);

  interface authData {
    email: string;
    password: string;
    confirm?: string;
  }
  const [userData, setUserData] = useState<authData>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name] : e.target.value})
  }

  const authFormSubmitHandler = (e: React.FormEvent) => {
      e.preventDefault();
    //   const auth = getAuth();
    //   if (loginMode) {
    //     signInWithEmailAndPassword(auth, userData.email, userData.password).then(
    //       (userCredential) => {
    //         const user = userCredential.user;
    //         console.log(auth);
    //         console.log(user)
    //       }
    //     );
    //   }
    console.log(userData)

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
          className='my-2 rounded py-2 placeholder:px-2'
          onChange={inputChangeHandler}
        />
        <input
          type='password'
          name='password'
          placeholder='Your Password'
          className='my-2 rounded py-2 placeholder:px-2'
          onChange={inputChangeHandler}
        />
        {!loginMode && (
          <input
            type='password'
            name='confirm'
            placeholder='Confirm Password'
            className='my-2 rounded py-2 placeholder:px-2'
            onChange={inputChangeHandler}
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

import React, { useState } from 'react';

const AddToDo = () => {
  const [newTodo, setNewTodo] = useState('');
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newTodo);
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      className='mx-10 h-12'
    >
      <input
        className='rounded w-full h-full px-5 text-xl text-gray-700 bg-slate-200 dark:bg-gray-700 dark:text-slate-200 focus:outline-none'
        type='text'
        name='todo'
        value={newTodo || ''}
        onChange={inputChangeHandler}
      />
    </form>
  );
};

export default AddToDo;

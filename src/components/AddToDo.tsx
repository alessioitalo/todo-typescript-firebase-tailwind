import React, { useState } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { nanoid } from 'nanoid';
// import { todosInterface } from '../App';

interface AddToDoProps {
  uid: string;
  fetchTodos: () => void;
  // setTodos: React.Dispatch<React.SetStateAction<todosInterface[]>>;
}

const AddToDo = ({ uid, fetchTodos }: AddToDoProps) => {
  const [newTodo, setNewTodo] = useState('');
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'todos', nanoid()), {
        user: uid,
        todo: newTodo,
        time: Timestamp.fromDate(new Date()),
        completed: false,
      });
      setNewTodo('');
      fetchTodos();
      // setTodos();

      // toastify success here
    } catch (err) {
      // toastify error here
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className='h-12'>
      <input
        className='rounded w-full h-full px-5 text-xl text-gray-700 bg-white dark:bg-gray-700 dark:text-slate-200 focus:outline-none'
        type='text'
        name='todo'
        value={newTodo || ''}
        onChange={inputChangeHandler}
      />
    </form>
  );
};

export default AddToDo;

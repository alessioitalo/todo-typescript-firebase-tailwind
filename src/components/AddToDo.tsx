//react imports
import React, { useState } from 'react';
// firebase
import { db } from '../firebase.config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
// other libraries
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

interface AddToDoProps {
  uid: string;
  fetchTodos: () => void;
}

const AddToDo = ({ uid, fetchTodos }: AddToDoProps) => {
  const [newTodo, setNewTodo] = useState('');
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.length < 2) {
      toast.error('Please enter a new task.');
      return;
    }
    try {
      await setDoc(doc(db, 'todos', nanoid()), {
        user: uid,
        todo: newTodo,
        time: Timestamp.fromDate(new Date()),
        completed: false,
      });
      setNewTodo('');
      fetchTodos();
      toast.success('New task added!');
    } catch (err) {
      toast.error('Something went wrong, please try again.');
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

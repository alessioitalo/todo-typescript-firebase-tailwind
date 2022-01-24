import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';

interface todosProps {
  uid: string;
}

const Todos = ({ uid }: todosProps) => {
  const [todos, setTodos] = useState([
    { id: '', data: { user: '', todo: '', completed:undefined } },
  ]);

  useEffect(() => {
    let todosArray: any[] = [];
    const fetchTodos = async () => {
      const todosRef = collection(db, 'todos');
      const q = query(todosRef, where('user', '==', uid));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        return todosArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setTodos(todosArray);
    };
    fetchTodos();
  }, [uid]);

  return (
    <div className='my-6 rounded'>
      {todos.map((todo) => (
        <div
          className='text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 dark:text-slate-200 px-6 h-12 flex items-center border-b border-b-gray-100 first:rounded-t'
          key={todo.id}
        >
          {todo.data.todo}
        </div>
      ))}
      <div className='text-gray-300 dark:text-gray-500 bg-white dark:bg-gray-700 dark:text-slate-200 px-6 h-12 flex justify-between items-center rounded-b'>
        <span>{todos.length} items left</span><span className='cursor-pointer'>Clear Completed</span>
      </div>
    </div>
  );
};

export default Todos;

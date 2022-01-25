import {
  doc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect } from 'react';
import { todosInterface } from '../App';

interface todosProps {
  uid: string;
  todos:
    | undefined
    | {
        id: string;
        data: { user: string; todo: string; completed: boolean; time: Date };
      }[];
  fetchTodos: () => void;
  setTodos: React.Dispatch<React.SetStateAction<todosInterface[] | undefined>>;
}

const Todos = ({ todos, setTodos, fetchTodos, uid }: todosProps) => {
  useEffect(() => {
    // try catch?
    fetchTodos();
  }, [uid]);

  const completeToDoHandler = async (id: string) => {
    document.getElementById(id)?.classList.add('line-through');
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      completed: true,
    });
  };

  const deleteCompletedHandler = async () => {
    setTodos((prevState) =>
      prevState!.filter((todo) => todo.data.completed !== true)
    );

    // must delete here

    // const todosRef = collection(db, 'todos');
    // const q = query(todosRef, where('complete', '==', true));
    // const snapshot = await getDocs(q);
    // snapshot.forEach(async (todo) => {
    //   await deleteDoc(doc(db, 'todos', todo.id));
    // });
  };

  return (
    <div className='my-6 rounded max-h-[50vh] overflow-auto'>
      {todos &&
        todos.map((todo) => (
          <div
            id={todo.id}
            className={`${
              todo.data.completed && 'line-through'
            } text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 dark:text-slate-200 px-6 h-12 flex items-center border-b border-b-gray-100 first:rounded-t`}
            key={todo.id}
            onClick={() => completeToDoHandler(todo.id)}
          >
            {todo.data.todo}
          </div>
        ))}
      <div className='text-gray-300 dark:text-gray-500 bg-white dark:bg-gray-700 dark:text-slate-200 px-6 h-12 flex justify-between items-center rounded-b'>
        {todos && (
          <>
            {/* <span>{todos.length} items left</span> */}
            <span>
              {todos.filter((todo) => todo.data.completed !== true).length}{' '}
              items
            </span>
            <span onClick={deleteCompletedHandler} className='cursor-pointer'>
              Clear Completed
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Todos;

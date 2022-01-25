//react imports
import { useEffect } from 'react';
// interfaces
import { todosInterface } from '../App';
// firebase
import { db } from '../firebase.config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

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
    try {
      fetchTodos();
    } catch (err) {
      toast.error('Something went wrong. Please refresh the page.');
    }
  }, [uid]);

  const completeToDoHandler = async (id: string) => {
    const todoDomElement = document.getElementById(id)!;
    const circleDomElement = document.getElementById('circle' + id);
    if (todoDomElement.classList.contains('line-through')) {
      todoDomElement.classList.remove('line-through');
      circleDomElement?.classList.remove('circle-active')
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        completed: false,
      });
    } else {
      todoDomElement.classList.add('line-through');
      circleDomElement?.classList.add('circle-active')
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        completed: true,
      });
    }
    fetchTodos();
  };

  const deleteCompletedHandler = () => {
    try {
      setTodos((prevState) =>
        prevState?.filter((todo) => todo.data.completed === false)
      );
      const toDelete = todos?.filter((todo) => todo.data.completed === true);
      toDelete?.forEach(async (todo) => {
        await deleteDoc(doc(db, 'todos', todo.id));
      });
      toast.success('Completed tasks have been deleted.');
    } catch (err) {
      toast.error('Something went wrong. Please refresh the page.');
    }
  };

  return (
    <div className='my-6 rounded max-h-[50vh] overflow-auto'>
      {todos &&
        todos.map((todo) => (
          <div
            id={todo.id}
            className={
              'flex justify-end relative text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 px-6 h-fit flex items-center border-b border-b-gray-100 first:rounded-t'
            }
            key={todo.id}
            onClick={() => completeToDoHandler(todo.id)}
          >
            <span
              id={`circle-${todo.id}`}
              className={`circle ${todo.data.completed && 'circle-active'}`}
            ></span>
            <span
              className={`cursor-pointer min-w-min w-[90%] text-left pl-2 py-3 ${
                todo.data.completed && 'line-through'
              }`}
            >
              {todo.data.todo}
            </span>
          </div>
        ))}
      <div className='flex text-gray-300 dark:text-gray-500 bg-white dark:bg-gray-700 px-6 h-12 flex justify-between items-center rounded-b'>
        {todos && (
          <>
            <span>
              Number of tasks left:{' '}
              {todos.filter((todo) => todo.data.completed !== true).length}
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

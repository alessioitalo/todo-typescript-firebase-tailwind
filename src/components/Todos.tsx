import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';

interface todosProps {
  uid: string;
}

const Todos = ({ uid }: todosProps) => {

  const [todos, setTodos] = useState([
    { id: '', data: { user: '', todo: '' } },
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
    <div className='my-6'>
      {todos.map((todo) => (
        <div
          className='bg-white border-2 border-black rounded w-100 my-1 mx-10 px-6 h-12 flex items-center'
          key={todo.id}
        >
          {todo.data.todo}
        </div>
      ))}
    </div>
  );
};

export default Todos;

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';

interface TodosProps {
  uid: string;
}

const Todos = ({ uid }: TodosProps) => {
  const [todos, setTodos] = useState([{ id: '', data: {} }]);

  useEffect(() => {
    let todosArray: { id: string; data: {} }[];
    const fetchTodos = async () => {
      const todosRef = collection(db, 'todos');
      const q = query(todosRef, where('user', '==', uid));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        return todos.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setTodos(todosArray);
    };

    fetchTodos();
    console.log(todos)

  });

  return (
    <>
      <div className='bg-white border-2 border-black rounded w-100 my-6 mx-10 h-12'></div>
    </>
  );
};

export default Todos;

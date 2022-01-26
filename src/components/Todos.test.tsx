import { screen, render } from '@testing-library/react';
import Todos from './Todos';

const mockTodos = [
  {
    id: 'id1',
    data: { user: 'uid1', todo: 'test 1', completed: false, time: new Date() },
  },
  {
    id: 'id2',
    data: { user: 'uid2', todo: 'test 2', completed: false, time: new Date() },
  },
  {
    id: 'id3',
    data: { user: 'uid3', todo: 'test 3', completed: false, time: new Date() },
  },
];

const initialComponent = (
  <Todos
    uid='id'
    setTodos={() => {}}
    fetchTodos={() => null}
    todos={mockTodos}
  />
);

describe('Todos component', () => {
  it('should render each task in state', () => {
    render(initialComponent);
    expect(screen.getByText(/test 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test 2/i)).toBeInTheDocument();
    expect(screen.getByText(/test 3/i)).toBeInTheDocument();
  });
});

import { Stack } from '@mui/material';
import React from 'react'
import TodoItem, { type Todo } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  onDelete
}) => {
  return (
    <Stack spacing={1.5}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  )
}

export default TodoList

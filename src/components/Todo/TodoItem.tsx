import { Box, Button, Typography } from '@mui/material';
import React from 'react'

export type Todo = {
  id: number;
  title: string;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({
  todo, index, onEdit, onDelete
}) => {
  return (
    <Box
      key={todo.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1,
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <Typography sx={{ minWidth: 24 }}>
        {index + 1}.
      </Typography>
      <Typography sx={{ flexGrow: 1 }}>
        {todo.title}
      </Typography>

      {/* Actions */}
      <Button
        size="small"
        variant="outlined"
        onClick={() => onEdit(todo)}
      >
        Edit
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </Button>
    </Box>
  )
}

export default TodoItem

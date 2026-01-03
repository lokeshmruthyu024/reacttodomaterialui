import { Button, Stack, TextField } from '@mui/material'
import React from 'react'

interface AddTodoProps {
  task: string;
  editId: number | null;
  onTaskChange: (value: string) => void;
  onSubmit: (event?: React.KeyboardEvent<HTMLDivElement>) => void;
}
const AddTodo: React.FC<AddTodoProps> = ({
  task,
  editId,
  onTaskChange,
  onSubmit
}) => {
  return (
    <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
      <TextField
        placeholder='Add todo'
        value={task}
        onChange={(e) => onTaskChange(e.target.value)}
        onKeyDown={onSubmit}
        fullWidth />
      <Button variant='contained'
        onClick={() => onSubmit()}
        sx={{ whiteSpace: "nowrap" }}
      >
        {editId ? "Update Todo" : "Add Todo"}
      </Button>
    </Stack>
  )
}

export default AddTodo

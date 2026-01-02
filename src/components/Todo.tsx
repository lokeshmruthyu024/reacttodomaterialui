import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
type Todo = {
  id: number;
  title: string;
}
const Todo: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  const isInitialLoad = React.useRef(true)
  useEffect(() => {
    const storedItems = localStorage.getItem("todos");
    if (storedItems) {
      setTodos(JSON.parse(storedItems));
    }
  }, [])
  const handleAddTodo = (
    event?: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event && event.key !== "Enter") return;
    if (task.trim() === "") return;
    if (editId !== null) {
      setTodos(todos.map((todo) =>
        todo.id === editId ? { ...todo, title: task } : todo
      )
      );
      setEditId(null);
      setTask("");
      return
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: task,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  }
  const handleDeleteTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  const handleEditTodo = (todo: Todo) => {
    setTask(todo.title);
    setEditId(todo.id);
  }
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <Container>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mt: 4, mb: 3, fontWeight: 600 }}
        >
          Redux Todo App
        </Typography>
        <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
          <TextField
            placeholder='Add todo'
            value={task}
            onChange={handleTask}
            onKeyDown={handleAddTodo}
            fullWidth />
          <Button variant='contained'
            onClick={() => handleAddTodo()}
            sx={{ whiteSpace: "nowrap" }}
          >
            {editId ? "Update Todo" : "Add Todo"}
          </Button>
        </Stack>
        <Stack spacing={1.5}>
          {todos.map((todo, index) => (
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
                onClick={() => handleEditTodo(todo)}
              >
                Edit
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDeleteTask(todo.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box >
    </Container >
  )
}

export default Todo

import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import AddTodo from './Todo/AddTodo';
import TodoList from './Todo/TodoList';
type Todo = {
  id: number;
  title: string;
}
const Todo: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
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
        <AddTodo
          task={task}
          editId={editId}
          onTaskChange={setTask}
          onSubmit={handleAddTodo}
        />
        <Box mt={3}>
          <TodoList
            todos={todos}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTask}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Todo

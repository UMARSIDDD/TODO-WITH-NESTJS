import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import { Container, Typography } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback((todo) => {
    setSelectedTodo(todo);
    setIsEditing(true);
  },[isEditing,selectedTodo]);

  const handleFormSubmit = () => {
    setSelectedTodo(null);
    setIsEditing(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Todo App
        </Typography>
        <TodoForm todo={selectedTodo} onSubmit={handleFormSubmit} isEditing={isEditing} />
        <TodoList onEdit={handleEdit} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;

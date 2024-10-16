// src/TodoList.js
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todo');
  return response.data;
};

const TodoList = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError } =useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/todo/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: (error) => {
      console.error('Delete error:', error.response?.data.message);
    },
  });

  const handleDelete = (id) => {
   
      deleteMutation.mutate(id);
  };

  if (isLoading) return <Typography variant="h6">Loading...</Typography>;
  if (isError) return <Typography variant="h6" color="error">Error fetching todos</Typography>;

  return (
    <>
      <List>
        {todos.length === 0 ? (
          <Typography variant="h6" sx={{ mt: 2 }}>No todos available</Typography>
        ) : (
          todos.map((todo) => (
            <ListItem key={todo.id} secondaryAction={
              <>
                <Button variant="outlined" onClick={() => onEdit(todo)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(todo.id)}>
                  Delete
                </Button>
              </>
            }>
              <ListItemText primary={todo.title} secondary={todo.description} />
            </ListItem>
          ))
        )}
      </List>
      {/* Show error messages related to deletion */}
      {deleteMutation.isError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {deleteMutation.error.response?.data.message || 'An unexpected error occurred while deleting.'}
        </Typography>
      )}
    </>
  );
};

export default TodoList;

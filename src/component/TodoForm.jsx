import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = ({ todo, onSubmit, isEditing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      if (isEditing) {
        return axios.patch(`http://localhost:3000/todo/${todo.id}`, newTodo);
      } else {
        return axios.post("http://localhost:3000/todo", newTodo);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      reset({title:'',description:''});
      onSubmit();
    },
    onError: (error) => {
      console.error("Form submission error:", error.response?.data.message);
    },
  });

  const onFormSubmit = (data) => {
    mutation.mutate(data);
  };
  useEffect(() => {
    if (isEditing && todo) {
      reset({
        title: todo.title || "",
        description: todo.description || "",
      });
    }
  }, [todo, isEditing, reset]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Typography variant="h5">
        {isEditing ? "Edit Todo" : "Add Todo"}
      </Typography>
      <Typography variant="body1" color="initial">
        Title
      </Typography>
      <TextField
        id="title"
        placeholder="Enter Title"
        fullWidth
        variant="outlined"
        margin="normal"
        defaultValue="Enter Title"
        {...register("title", {
          required: "Title is required",

          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
          },
        })}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ""}
      />
      <Typography variant="body1" color="initial">
        Description
      </Typography>
      <TextField
        id="description"
        placeholder="Enter description"
        fullWidth
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        {...register("description", {
          required: "Description is required",
          minLength: {
            value: 6,
            message: "Description must be at least 6 characters long",
          },
        })}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ""}
      />
      <Button type="submit" variant="contained" color="primary">
        {isEditing ? "Update Todo" : "Add Todo"}
      </Button>

      {/* Displaying error messages from the mutation */}
      {mutation.isError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {mutation.error.response?.data.message ||
            "An unexpected error occurred while submitting."}
        </Typography>
      )}
    </form>
  );
};

export default TodoForm;


import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTodoPage({ fetchTodosData }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState([]);

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    if (!title) {
      alert('must enter a title');
      return;
    }

    const obj = {
      title,
      body,
    };

    console.log(obj);

    // שמירה
    addPost(obj);

    alert('succes add post');

    // מעבר אוטומטי לדף המשימות
    navigate('/posts');
  };

  const addPost = async (obj) => {
    await Axios.post('http://localhost:7500/api/articles/', obj);
    // fetchTodosData()
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper sx={{ width: 400, p: 4 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Add a new Post
        </Typography>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="body"
            placeholder="your post"
            onChange={(e) => setBody(e.target.value)}
          />

          <Button onClick={handleSave} type="button">
            Add
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}


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

export default function AddTodoPage() {
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

    addPost(obj);

    alert('succes add post');

    navigate('/posts');
  };

  const addPost = async (obj) => {
    await Axios.post('http://localhost:7500/api/articles/', obj);
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
            id="outlined-basic"
            label="body"
            placeholder="your post"
            multiline
            maxRows={4}
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

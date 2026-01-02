
import * as React from 'react';
import {
  Box,
  TextField,
  Checkbox,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTodoPage({ fetchTodosData }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    // בדיקה זהה למקור
    if (!title) {
      alert('must enter a title');
      return;
    }

    const obj = {
      title,
      tags,
      completed
    };

    console.log(obj);

    // שמירה
    addTodo(obj);

    alert('succes add todo');

    // מעבר אוטומטי לדף המשימות
    navigate('/todos');
  };

  const addTodo = async (obj) => {
    await Axios.post('http://localhost:7500/api/tasks/', obj);
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
          Add a new Todo
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
            label="tags"
            placeholder="Insert tags with a space between each other"
            onChange={(e) => setTags(e.target.value.split(' '))}
          />

          <Box display="flex" alignItems="center">
            <Checkbox
              color="secondary"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
            <Typography>Completed</Typography>
          </Box>

          <Button onClick={handleSave} type="button">
            Add
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

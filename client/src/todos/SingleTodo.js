import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Update1 from './Update1'



export default function BasicCard({ todo, fetchTodosData }) {
  // const [checked, setChecked] = useState(todo.completed);

  const handleChange = async (event) => {
    // setChecked(event.target.checked)
    await Axios.put(`http://localhost:7500/api/tasks/${todo._id}`)
    fetchTodosData()
  };
  const handleDelete = async () => {
    await Axios.delete(`http://localhost:7500/api/tasks/`, {
      data: { id: todo._id }
    })
    fetchTodosData()
  }
  return (
    <Card sx={{ minWidth: 275, m: '20px', bgcolor: "#fefefd", borderColor: "#845ec2" }}>
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 28, color: "#c493ff" }}>
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Checkbox
          size="large"
          checked={checked}
          onChange={handleChange}
          slotProps={{
            input: { 'aria-label': 'controlled' },
          }}
        /> */}
        {/* <IconButton aria-label="delete" size="large" onClick={handleDelete}>
              <DeleteIcon fontSize="inherit" />
            </IconButton> */}
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          {/* <Fab color="primary" aria-label="edit">
            <EditIcon />
          </Fab> */}
          <Update1 todo={todo} fetchTodosData={fetchTodosData} />
          <Fab color="secondary" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
          <Checkbox
            checked={todo.completed}
            onChange={handleChange}
            icon={<CloseIcon />}
            checkedIcon={<CheckIcon sx={{ color: '#fff' }} />}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '80%',
              backgroundColor: todo.completed ? '#c99cffff' : '#969494ff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              '&:hover': {
                backgroundColor: todo.completed ? '#b578ffff' : '#636060ff',
              },
            }}
            
          />
        </Box>
      </CardActions>
    </Card>
  );
}

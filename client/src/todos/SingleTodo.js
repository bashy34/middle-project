import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useState } from 'react';



export default function BasicCard({todo}) {
    const [checked, setChecked] = useState(todo.completed);

    const handleChange = (event) => {
            setChecked(event.target.checked)
            Axios.put(`http://localhost:7500/api/tasks/${todo._id}`) 
        };
  return (
    <Card sx={{ minWidth: 275 ,m:'20px',bgcolor:"#fefefd" , borderColor:"#845ec2"}}>
      <CardContent>
        <Typography gutterBottom sx={{  fontSize: 28 ,color:"#c493ff"}}>
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Checkbox
            checked={checked}
            onChange={handleChange}
            slotProps={{
                input: { 'aria-label': 'controlled' },
            }}
            />
      </CardActions>
    </Card>
  );
}

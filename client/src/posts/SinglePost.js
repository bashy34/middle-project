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
import UpdatePost from './UpdatePost'



export default function BasicCard({ post, fetchPostsData }) {
  const handleDelete = async () => {
    await Axios.delete(`http://localhost:7500/api/articles/`, {
      data: { id: post._id }
    })
    fetchPostsData()
  }
  return (
    <Card sx={{ minWidth: 275, m: '20px', bgcolor: "#fefefd", borderColor: "#845ec2" }}>
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 28, color: "#c493ff" }}>
          {post.title}
        </Typography><Typography gutterBottom sx={{ fontSize: 20, color: "#3e196cff" }}>
          {post.body}
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
          <UpdatePost post={post} fetchPostsData={fetchPostsData} />
          <Fab color="secondary" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
        </Box>
      </CardActions>
    </Card>
  );
}

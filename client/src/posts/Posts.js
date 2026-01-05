import Axios from 'axios'
import { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, IconButton } from '@mui/material';

function Posts() {
  const [postsData, setPostsData] = useState([])
  const [filtered, setFiltered] = useState([])
  const navigate = useNavigate();
  const fetchPostsData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/articles/')
    setPostsData(data)
    setFiltered(data)
  }
  const fetchPostsDataTop5 = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/articles/limit')
    console.log(data)
    setPostsData(data)
    setFiltered(data)
  }
  useEffect(() => {
    fetchPostsData()
  }
    , [])
  const searchWord = (word) => {
    const found = postsData.filter(post => post.title.includes(word) || post.body.includes(word))
    setFiltered(found)
  }

  return (
    <div>
      <Box
        sx={{
          // position: 'fixed',   // 👈 הכי חשוב
          // top: 100,
          // right: 16,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 1,
          margin: "25px"
          // zIndex: 1000
        }}
      >
        <Box>
          <TextField
            label="Search"
            color="secondary"
            focused margin="normal"
            size="small"
            onChange={(e) => {searchWord(e.target.value)}}
            sx={{
              mt: '6px',
              height: '40px',
              background: "white"
            }}
          />

          <IconButton
            sx={{
              color: 'purple',
              mt: '6px',
              height: '40px'
            }}
          >
            <SearchIcon sx={{ fontSize: 34 }} />
          </IconButton>
        </Box>
        <Button color="secondary" variant="outlined" onClick={fetchPostsDataTop5}>Top 5</Button>
      </Box>
      {
        filtered.map(post => <SinglePost post={post} fetchPostsData={fetchPostsData} />)
      }
      <Fab sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: "9999", width: 85, height: 85, background: "red"}}
        color="secondary" aria-label="add" onClick={() => { navigate('/AddPost') }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Posts
import Axios from 'axios'
import { useEffect, useState } from 'react'
import SingleTodo from './SingleTodo'
import AddTodo from './AddTodo'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, IconButton } from '@mui/material';

function Todos() {
  const [todosData, setTodosData] = useState([])
  const [filtered, setFiltered] = useState([])
  const navigate = useNavigate()
  const fetchTodosData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/tasks/')
    setTodosData(data)
    setFiltered(data)
  }
  const fetchTodosDataTop5 = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/tasks/limit')
    console.log(data)
    setTodosData(data)
    setFiltered(data)
  }
  useEffect(() => {
    fetchTodosData()
  }
    , [])
  const searchWord = (word) => {
    const found = todosData.filter(todo => todo.title.includes(word))
    console.log(found)
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
        <Button color="secondary" variant="outlined" onClick={fetchTodosDataTop5}>Top 5</Button>
      </Box>

      {
        filtered.map(todo => <SingleTodo todo={todo} fetchTodosData={fetchTodosData} />)
      }
      <Fab sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: "9999", width: 85, height: 85, background: "red"}}
        color="secondary" aria-label="add" onClick={() => { navigate('/AddTodo') }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Todos
import Axios from 'axios'
import { useEffect, useState } from 'react'
import SingleTodo from './SingleTodo'
import AddTodo from './AddTodo'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Todos() {
  const [todosData, setTodosData] = useState([])
  const navigate = useNavigate();
  const fetchTodosData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/tasks/')
    setTodosData(data)
  }
  useEffect(() => {
    fetchTodosData()
  }
    , [])

  return (
    <div>

      {
        todosData.map(todo => <SingleTodo todo={todo} fetchTodosData={fetchTodosData} />)
      }
      <Fab color="secondary" aria-label="add" onClick={()=>{navigate('/AddTodo')}}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Todos
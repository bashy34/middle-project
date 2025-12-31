import React from 'react'
import Axios from 'axios'
import { useEffect,useState } from 'react'
import SingleTodo from './SingleTodo'
function Todos() {
    const [todosData, setTodosData] = useState([])
    const fetchTodosData = async () => {
        const {data} = await
        Axios.get('http://localhost:7500/api/tasks/')
        setTodosData(data)
    }
    useEffect(()=>{
        fetchTodosData()
    }
    ,[])

  return (
    <div>
        
        {
            todosData.map(todo => <SingleTodo todo={todo}/>)
        }
    </div>
  )
}

export default Todos
import Axios from 'axios'
import { useEffect,useState } from 'react'
import SingleTodo from './SingleTodo'
import AddTodo from './AddTodo'


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
            todosData.map(todo => <SingleTodo todo={todo} fetchTodosData={fetchTodosData}/>)
        }
      <AddTodo fetchTodosData={fetchTodosData}/>
    </div>
  )
}

export default Todos
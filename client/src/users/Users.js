import Axios from 'axios'
import { useEffect, useState } from 'react'
import SingleUser from './SingleUser'
import AddUser from './Adduser'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Users() {
  const [usersData, setUsersData] = useState([])
  const navigate = useNavigate();
  const fetchUsersData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/users/')
    setUsersData(data)
  }
  useEffect(() => {
    fetchUsersData()
  }
    , [])

  return (
    <div>

      {
        usersData.map(user => <SingleUser user={user} fetchUsersData={fetchUsersData} />)
      }
      <Fab color="secondary" aria-label="add" onClick={()=>{navigate('/AddUser')}}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Users
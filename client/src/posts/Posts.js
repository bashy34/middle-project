import Axios from 'axios'
import { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import AddPost from './AddPost'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Todos() {
  const [postsData, setPostsData] = useState([])
  const navigate = useNavigate();
  const fetchPostsData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/articles/')
    setPostsData(data)
  }
  useEffect(() => {
    fetchPostsData()
  }
    , [])

  return (
    <div>

      {
        postsData.map(post => <SinglePost post={post} fetchPostsData={fetchPostsData} />)
      }
      <Fab color="secondary" aria-label="add" onClick={()=>{navigate('/AddPost')}}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Todos
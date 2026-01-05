import Axios from 'axios'
import { useEffect, useState } from 'react'
import SingleUser from './SingleUser'
import AddUser from './Adduser'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Users() {
  const [usersData, setUsersData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [parameter, setParameter] = useState("name")
  const navigate = useNavigate();
  const fetchUsersData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/users/')
    setUsersData(data)
    setFiltered(data)
  }
  const fetchUsersDataTop5 = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/users/limit')
    setFiltered(data)
    setUsersData(data)
  }
  useEffect(() => {
    fetchUsersData()
  }
    , [])
  const handleChange = (p) => {
    setParameter(p)
    console.log(parameter)
  };

  const searchWord = (word) => {
    const found = usersData.filter(user => user[parameter].includes(word))
    setFiltered(found)
  }

  return (
    <div>
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 1,
        margin: "25px"
      }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="demo-simple-select-label">חיפוש לפי</InputLabel>
          <Select
            label="search"
            color="secondary"
            focused margin="normal"
            sx={{
              mt: '6px',
              height: '40px',
              background: "white",
            }}
            onChange={(e) => {handleChange(e.target.value)}}
            value={parameter}
            required
          >
            <MenuItem value={"name"}>name</MenuItem>
            <MenuItem value={"userName"}>userName</MenuItem>
            <MenuItem value={"phone"}>phone</MenuItem>
            <MenuItem value={"email"}>email</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 1,
          margin: "25px"
        }}
      >
        <Box>
          <TextField
            label="Search"
            color="secondary"
            focused margin="normal"
            size="small"
            onChange={(e) => { searchWord(e.target.value) }}
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
        <Button color="secondary" variant="outlined" onClick={fetchUsersDataTop5}>Top 5</Button>
      </Box>
      {
        filtered.map(user => <SingleUser user={user} fetchUsersData={fetchUsersData} />)
      }
      <Fab sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: "9999", width: 85, height: 85, background: "red" }}
        color="secondary" aria-label="add" onClick={() => { navigate('/AddUser') }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Users
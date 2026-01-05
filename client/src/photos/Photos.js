import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import UpdatePhoto from './UpdatePhoto'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, IconButton } from '@mui/material';

export default function TitlebarImageList() {
  const [photosData, setPhotosData] = useState([])
  const [filtered, setFiltered] = useState(photosData)
  const navigate = useNavigate()
  const fetchPhotosData = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/potos/')
    setPhotosData(data)
    setFiltered(data)
  }
  const fetchPhotosDataTop5 = async () => {
    const { data } = await Axios.get('http://localhost:7500/api/potos/limit')
    setPhotosData(data)
    setFiltered(data)
  }
  useEffect(() => {
    fetchPhotosData()
  }
    , [])
  const searchWord = (word) => {
    const found = photosData.filter(photo => photo.title.includes(word))
    setFiltered(found)
  }

  const handleDelete = async (item) => {
    await Axios.delete(`http://localhost:7500/api/potos/`, {
      data: { id: item._id }
    })
    fetchPhotosData()
  }
  console.log(photosData)
  return (
    <>
<Box
        sx={{
          // position: 'fixed',   // 👈 הכי חשוב
          // top: 100,
          // right: 16,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 1,
          margin:"25px"
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
            background:"white"
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
        <Button color="secondary" variant="outlined" onClick={fetchPhotosDataTop5}>Top 5</Button>
      </Box>
            <ImageList sx={{ width: 1500, height: 600 }}>
        <ImageListItem key="Subheader" cols={3}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {filtered.map((item) => (
          <ImageListItem key={item.imageUrl}>
            <img
              srcSet={`http://localhost:7500/${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`http://localhost:7500/${item.imageUrl}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              actionIcon={<>
                <UpdatePhoto item={item} fetchPhotosData={fetchPhotosData} />
                <Fab color="secondary" aria-label="delete" onClick={() => { handleDelete(item) }}>
                  <DeleteIcon />
                </Fab>
              </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Fab sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: "9999", width: 85, height: 85, background: "red"}}
        color="secondary" aria-label="add" onClick={() => { navigate('/AddPhotos') }}>
        <AddIcon />
      </Fab>
    </>
  );
}


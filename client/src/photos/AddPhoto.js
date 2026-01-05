
import * as React from 'react';
import {
    Box,
    TextField,
    Checkbox,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddTodoPage() {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();
    const handleChange = (event) => {
        setImageUrl(event.target.value);
    };


    const handleSave = (e) => {
        e.preventDefault();

        // בדיקה זהה למקור
        if (!title || !imageUrl) {
            alert('must enter title and url');
            return;
        }

        const obj = {
            title,
            imageUrl,
        };

        console.log(obj);

        // שמירה
        addPhoto(obj);

        alert('succes add photo');

        // מעבר אוטומטי לדף המשימות
        navigate('/photos');
    };

    const addPhoto = async (obj) => {
        await Axios.post('http://localhost:7500/api/potos/', obj);
        // fetchTodosData()
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper sx={{ width: 400, p: 4 }}>
                <Typography variant="h5" textAlign="center" mb={3}>
                    Add a new photo
                </Typography>

                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    {/* <TextField
                        label="image url"
                        placeholder="Insert tags with a space between each other"
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    /> */}
                    <Box sx={{ minWidth: 120 }}>
                        <Typography variant="normal" textAlign="center" mb={5}>
                            choose a picture from the list:
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Photo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={imageUrl}
                                label="image"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={"safa.jpg"}>safa.jpg</MenuItem>
                                <MenuItem value={"closet.jpg"}>closet.jpg</MenuItem>
                                <MenuItem value={"table.jpg"}>table.jpg</MenuItem>
                                <MenuItem value={"chair.jpg"}>chair.jpg</MenuItem>
                                <MenuItem value={"beds.jpg"}>beds.jpg</MenuItem>
                                <MenuItem value={"small_table.jpg"}>small_table.jpg</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>


                    <Button onClick={handleSave} type="button">
                        Add
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}




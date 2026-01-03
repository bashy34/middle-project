
import * as React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTodoPage() {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();

        if (!name || !userName) {
            alert('must enter name and user name');
            return;
        }

        const obj = {
            name,
            userName,
            email,
            address,
            phone
        };
        // שמירה
        addUser(obj);
        alert('succes add user');

        // מעבר אוטומטי לדף המשימות
        navigate('/users');
    };

    const addUser = async (obj) => {
        await Axios.post('http://localhost:7500/api/users/', obj);
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
                    Add a new user
                </Typography>

                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="name"
                        placeholder="Insert your name"
                        value={name}
                        color="secondary"
                        focused margin="normal"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <TextField
                        label="user name"
                        placeholder="Insert your user name"
                        focused margin="normal"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />

                    <TextField
                        label="email"
                        variant="outlined"
                        placeholder="Insert your email"
                        color="secondary"
                        focused margin="normal"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <TextField
                        label="address"
                        variant="outlined"
                        placeholder="Insert your address"
                        focused margin="normal"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />

                    <TextField
                        label="phone"
                        variant="outlined"
                        placeholder="Insert tags with a space between each other"
                        color="secondary"
                        focused margin="normal"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                    />

                    <Button onClick={handleSave} type="button">
                        Add
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

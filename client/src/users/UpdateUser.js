import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(4),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

export default function CustomizedDialogs({ fetchUsersData, user }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);

    useEffect(() => {
        setName(user.name);
        setUserName(user.userName);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
        
    }, [user]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };
    const handleupdate = (e) => {
        e.preventDefault();
        if (!name || !userName) {
            alert("must enter a name and user name")
            return
        }
        const obj = {
            id: user._id,
            name,
            userName,
            email,
            address,
            phone
        }
        //save in DB
        updateUser(obj)
        alert("succes update user")
        setOpen(false);
    }
    const updateUser = async (obj) => {
        await Axios.put(`http://localhost:7500/api/users/`, obj)
        fetchUsersData()
    }

    return (
        <React.Fragment>

            <Fab color="primary" aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </Fab>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit User
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch', display: "flex" } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            label="name" variant="outlined"
                            color="secondary"
                            focused margin="normal"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}

                            required
                        />

                        <TextField
                            id="outlined-basic"
                            label="user name"
                            variant="outlined"
                            placeholder=""
                            color="secondary"
                            focused margin="normal"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }}
                            required
                        />

                        <TextField
                            id="outlined-basic"
                            label="email"
                            variant="outlined"
                            placeholder="Insert your email"
                            color="secondary"
                            focused margin="normal"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="address"
                            variant="outlined"
                            placeholder="Insert your address"
                            color="secondary"
                            focused margin="normal"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                        />

                        <TextField
                            id="outlined-basic"
                            label="phone"
                            variant="outlined"
                            placeholder="Insert tags with a space between each other"
                            color="secondary"
                            focused margin="normal"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleupdate} type='button'>
                        save edit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
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

export default function CustomizedDialogs({ fetchTodosData, todo }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [tags, setTags] = useState(todo.tags);
    const [completed, setCompleted] = useState(todo.completed)
    console.log(typeof (completed) + " " + completed)

    useEffect(() => {
        setTitle(todo.title);
        setTags(todo.tags);
        setCompleted(Boolean(todo.completed));
    }, [todo]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };
    const handleupdate = (e) => {
        e.preventDefault();
        if (!title) {
            alert("must enter a title")
            return
        }
        const obj = {
            id: todo._id,
            title,
            tags,
            completed
        }
        console.log(obj)
        //save in DB
        updateTodo(obj)
        alert("succes add todo")
        setOpen(false);
        // setTitle("")
        // setTags([])
        // setCompleted(false)
    }
    const updateTodo = async (obj) => {
        await Axios.put(`http://localhost:7500/api/tasks/`, obj)
        fetchTodosData()
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
                    Edit Todo
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
                            label="title" variant="outlined"
                            color="secondary"
                            focused margin="normal"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}

                            required
                        />

                        <TextField
                            id="outlined-basic"
                            label="tags"
                            variant="outlined"
                            placeholder="Insert tags with a space between each other"
                            color="secondary"
                            focused margin="normal"
                            value={tags.join(' ')}
                            onChange={(e) => { setTags(e.target.value.split(' ')) }}
                        />

                        <Checkbox
                            color="secondary"
                            onChange={(e) => { setCompleted(e.target.checked) }}
                            checked={completed}
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
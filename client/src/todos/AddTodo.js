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
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Axios from 'axios';
import Alert from '@mui/material/Alert';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(4),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

export default function CustomizedDialogs({fetchTodosData}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [completed, setCompleted] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const myAlert = () => {
        return <Alert severity="success">This is a success Alert.</Alert>
    }
    const handleSave = (e) => {
        e.preventDefault();
        if (!title) {
            alert("must enter a title")
            return
        }
        const obj = {
            title,
            tags,
            completed
        }
        console.log(obj)
        //save in DB
        addTodo(obj)
        alert("succes add todo")
        setOpen(false);
        setTitle("")
        setTags([])
        setCompleted(false)
    }
    const addTodo = async (obj) => {
        await Axios.post(`http://localhost:7500/api/tasks/`, obj)
        fetchTodosData()
    }

    return (
        <React.Fragment>

            <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add a new Todo
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
                            
                            onChange={(e) => { setTags(e.target.value.split(' ')) }}
                        />

                        <Checkbox 
                        color="secondary" 
                        onChange={()=>{setCompleted(!completed)}}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} type='button'>
                        Add
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

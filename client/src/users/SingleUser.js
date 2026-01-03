import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import UpdateUser from './UpdateUser'



export default function BasicCard({ user, fetchUsersData }) {
    const handleDelete = async () => {
        await Axios.delete(`http://localhost:7500/api/users/`, {
            data: { id: user._id }
        })
        fetchUsersData()
    }
    return (
        <Card sx={{ minWidth: 275, m: '20px', bgcolor: "#fefefd", borderColor: "#845ec2" }}>
            <CardContent>
                <Typography gutterBottom sx={{ fontSize: 28, color: "#c493ff" }}>
                    name: {user.name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 20, color: "#3e196cff" }}>
                    user name: {user.userName}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 20, color: "#3e196cff" }}>
                    email: {user.email}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 20, color: "#3e196cff" }}>
                    address: {user.address}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 20, color: "#3e196cff" }}>
                    phone: {user.phone}
                </Typography>
            </CardContent>
            <CardActions>

                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <UpdateUser user={user} fetchUsersData={fetchUsersData} />
                    <Fab color="secondary" aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </Fab>
                </Box>
            </CardActions>
        </Card>
    );
}

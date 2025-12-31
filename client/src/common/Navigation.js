// import React from 'react'
// import { NavLink } from 'react-router-dom'


// function Navigation() {
//   return (
//     <div>
//         <NavLink to='/'>Home Page</NavLink>
//         <NavLink to='/Posts'>posts</NavLink>
//         <NavLink to='/Todos'>todos</NavLink>
//         <NavLink to='/Users'>users</NavLink>
//         <NavLink to='/Potos'>potos</NavLink>
//     </div>
//   )
// }

// export default Navigation
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArticleIcon from '@mui/icons-material/Article';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CameraIcon from '@mui/icons-material/Camera';
import { Link } from 'react-router-dom'


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation  sx={{ width: 1400, margin:5, }} value={value} onChange={handleChange}>
      <BottomNavigationAction 
        label="Posts"
        icon={<ArticleIcon />}
        component={Link} to="/posts"
      />
      <BottomNavigationAction
        label="Todos"
        icon={<PlaylistAddCheckIcon />}
        component={Link} to="/todos"
      />
      <BottomNavigationAction
        label="Users"
        icon={<PeopleAltIcon />}
        component={Link} to="/users"
      />
      <BottomNavigationAction
        label="Photos"
        icon={<CameraIcon />}
        component={Link} to="/photos"
      />
    </BottomNavigation>
  );
}

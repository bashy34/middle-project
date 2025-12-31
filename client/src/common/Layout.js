import React from 'react'
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Navigation />
        <Outlet />
    </div>
  )
}

export default Layout
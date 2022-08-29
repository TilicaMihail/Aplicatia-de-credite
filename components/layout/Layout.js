import React, { useState } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className = 'flex bg-gray-100 min-h-screen'>
            <div className = 'text-4xl fixed p-3 btn-hover cursor-pointer' onClick = {e => setSidebarOpen(true)}>
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <Sidebar open = {sidebarOpen} setOpen = {setSidebarOpen} />
            <div className = 'grow pl-0 sm:pl-60'>
                { children }
            </div>
        </div>
    )
}

export default Layout
import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <div className = 'flex bg-gray-100'>
            <Sidebar />
            <div className = 'grow '>
                { children }
            </div>
        </div>
    )
}

export default Layout
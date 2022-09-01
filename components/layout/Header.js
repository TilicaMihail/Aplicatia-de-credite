import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import CreatedProjects from '../stats/CreatedProjects'
import SignedUpProjects from '../stats/SignedUpProjects'
import TotalCredite from '../stats/TotalCredite'
import TotalUsers from '../stats/TotalUsers'
import SearchBar from './SearchBar'

const Header = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className = 'bg-blue-400 flex flex-col p-10'>
            <div className = 'flex w-full items-center justify-center'>
                <SearchBar />
            </div>
            <div className = 'w-full flex items-center justify-evenly pt-10'>
                {
                    user?.role === 'elev' ?
                    <>
                        <TotalCredite />
                        <SignedUpProjects />
                    </> : 
                    <>
                        <CreatedProjects />
                        <TotalUsers />
                    </>
                }
            </div>
        </div>
    )
}

export default Header
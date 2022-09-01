import React from 'react'
import SignedUpProjects from '../stats/SignedUpProjects'
import TotalCredite from '../stats/TotalCredite'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className = 'bg-blue-400 flex flex-col p-10'>
            <div className = 'flex w-full items-center justify-center'>
                <SearchBar />
            </div>
            <div className = 'w-full flex items-center justify-evenly pt-10'>
                <TotalCredite />
                <SignedUpProjects />
            </div>
        </div>
    )
}

export default Header
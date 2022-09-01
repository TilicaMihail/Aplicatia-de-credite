import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const SearchBar = () => {
    const { searchFilter, setSearchFilter } = useContext(SearchContext)

    useEffect(() => {
        setSearchFilter('')
    }, [])

    return (
        <div className = 'rounded-full p-2 bg-white overflow-hidden max-w-md flex items-center'>
            <div className = 'h-full flex items-center justify-center text-xl pl-1'>
                <ion-icon name="search-outline"></ion-icon>
            </div>
            <input 
                placeholder={'Search by name'}
                className = 'outline-none pl-2'
                value = {searchFilter}
                onChange = {e => setSearchFilter(e.target.value)}
            />
        </div>
    )
}

export default SearchBar
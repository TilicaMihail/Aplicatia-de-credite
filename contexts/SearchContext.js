import React, { useEffect, useState } from 'react'

export const SearchContext = React.createContext({})

const SearchProvider = ({ children }) => {
    const [searchFilter, setSearchFilter] = useState('')

    return (
        <SearchContext.Provider value = {{ searchFilter, setSearchFilter }}>
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider
import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
]

const ProfilSelect = ({ value, setValue, className }) => {
    return (
        <div>
            <div className = 'text-sm'>
                Profil
            </div>
            <Select 
                aria-label = {'hello'}
                value = {value} 
                options = {options}
                onChange = {e => setValue(e)} 
                className={className} 
            />
        </div>
    )
}

export default ProfilSelect
import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'elev', label: 'elev' },
    { value: 'profesor', label: 'profesor' },
    { value: 'admin', label: 'admin' },
]

const RoleSelect = ({ value, setValue, className }) => {
    return (
        <>
            <Select 
                value = {value} 
                isClearable = {true}
                options = {options}
                onChange = {e => setValue(e)} 
                className={className} 
            />
        </>
    )
}

export default RoleSelect
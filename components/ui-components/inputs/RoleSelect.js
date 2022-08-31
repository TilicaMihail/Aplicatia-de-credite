import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'elev', label: 'elev' },
    { value: 'profesor', label: 'profesor' },
    { value: 'admin', label: 'admin' },
]

const RoleSelect = ({ value, setValue, className }) => {
    return (
        <div>
            <div className = 'text-sm'>
                Rol
            </div>
            <Select 
                value = {value} 
                options = {options}
                onChange = {e => setValue(e)} 
                className={className} 
            />
        </div>
    )
}

export default RoleSelect
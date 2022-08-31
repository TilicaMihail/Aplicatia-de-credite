import React from 'react'
import Select from 'react-select'

const options = [
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '10' },
    { value: 12, label: '12' },
]

const ClasaSelect = ({ value, setValue, className }) => {
    return (
        <div className = ''>
            <div className = 'text-sm'>
                Clasa
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

export default ClasaSelect
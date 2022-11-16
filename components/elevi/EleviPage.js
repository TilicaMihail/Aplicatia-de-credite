import { info } from 'daisyui/src/colors'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { SearchContext } from '../../contexts/SearchContext'
import { UsersContext } from '../../contexts/UsersContext'
import Header from '../layout/Header'
import Elev from './Elev'
import Select from 'react-select'

const options = [
    { label: 'All', value: {} },
    { label: '9A', value: {clasa: 9, profil: 'A'} }, 
    { label: '9B', value: {clasa: 9, profil: 'B'} },
    { label: '10A', value: {clasa: 10, profil: 'A'} },
    { label: '10B', value: {clasa: 10, profil: 'B'} },
    { label: '11A', value: {clasa: 11, profil: 'A'} },
    { label: '11B', value: {clasa: 11, profil: 'B'} },
    { label: '12A', value: {clasa: 12, profil: 'A'} },
    { label: '12B', value: {clasa: 12, profil: 'B'} },
]

const EleviPage = () => {
    const [filter, setFilter] = useState({ label: 'All', value: {} })
    const { user } = useContext(AuthContext)
    const { students } = useContext(UsersContext)
    const { searchFilter } = useContext(SearchContext)

    return (
        <div>
            <Header />
            <div className = 'p-8'>
                <div className = 'flex items-center justify-between pb-4'>
                    <div className = 'font-bold text-xl sm:text-2xl '>
                        Elevi 
                    </div>
                    {/* { user?.role === 'admin' &&
                    <div className = 'btn btn-info text-white'>
                        Obtine fisele de credite
                    </div>
                    } */}
                    <div>
                    <Select 
                        aria-label = {'hello'}
                        value = {filter} 
                        options = {options}
                        onChange = {e => setFilter(e)} 
                    />
                    </div>
                </div>
                <div className = 'flex flex-col gap-3'>
                    {
                        students?.filter(student => !(filter.value?.clasa && filter.value?.profil && !(student.clasa === filter.value.clasa && student.profil === filter.value.profil))).map((student, index) => {
                            if(!(student.firstName + " " + student.lastName ).toLowerCase().includes(searchFilter.toLowerCase())) return
                            return (
                                <div key = {index}>
                                    <Elev student = {student} index = {index} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default EleviPage
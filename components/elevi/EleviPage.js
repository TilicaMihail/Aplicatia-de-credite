import { info } from 'daisyui/src/colors'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { SearchContext } from '../../contexts/SearchContext'
import { UsersContext } from '../../contexts/UsersContext'
import Header from '../layout/Header'
import Elev from './Elev'

const EleviPage = () => {
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
                    { user?.role === 'admin' &&
                    <div className = 'btn btn-info text-white'>
                        Obtine fisele de credite
                    </div>
                    }
                </div>
                <div className = 'flex flex-col gap-3'>
                    {
                        students?.map((student, index) => {
                            if(!(student.firstName + " " + student.lastName ).includes(searchFilter)) return
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
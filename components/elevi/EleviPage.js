import { info } from 'daisyui/src/colors'
import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import { UsersContext } from '../../contexts/UsersContext'
import Header from '../layout/Header'
import Elev from './Elev'

const EleviPage = () => {

    const { students } = useContext(UsersContext)
    const { searchFilter } = useContext(SearchContext)

    return (
        <div>
            <Header />
            <div className = 'p-8'>
                <div className = 'font-bold text-xl sm:text-2xl pb-4'>
                    Elevi 
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
import React, { useContext, useEffect } from 'react'
import { UsersContext } from '../../contexts/UsersContext'
import Header from '../layout/Header'
import Elev from './Elev'

const EleviPage = () => {

    const { students, getStudents } = useContext(UsersContext)

    useEffect(() => {
        getStudents()
    }, [])

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
import React, { useContext } from 'react'
import { UsersContext } from '../../contexts/UsersContext'
import Header from '../layout/Header'

const EleviPage = () => {

    const { students } = useContext(UsersContext)

    return (
        <div>
            <Header />
            <div className = 'p-8'>
                <div className = 'font-bold text-xl sm:text-2xl'>
                    Elevi 
                </div>
                <div>
                    {
                        students?.map((student, index) => {
                            return (
                                <div key = {index}>
                                    aaa
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
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const UsersContext = React.createContext({})

const UsersProvider = ({ children }) => {
    const [students, setStudents] = useState()
    const [teachers, setTeachers] = useState()
    const [studentsByClasa, setStudentsByClasa] = useState()
    const [loading, setLoading] = useState()
    
    const getStudents = async () => {

    }

    const getTeachers = async () => {

    }

    const getStudentsByClasa = async () => {

    }

    const getUserById = async () => {

    }

    const updateUsers = async () => {

    }

    const deleteUser = async () => {

    }

    useEffect(() => {

    }, [])

    return (
        <UsersContext.Provider value = {{ 
            students, 
            teachers, 
            studentsByClasa,
            loading,
            getStudents,
            getTeachers,
            getStudentsByClasa,
            getUserById,
            updateUsers,
            deleteUser,
        }}>
            { children }
        </UsersContext.Provider>
    )
}

export default UsersProvider
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const UsersContext = React.createContext({})

const UsersProvider = ({ children }) => {
    const [students, setStudents] = useState()
    const [teachers, setTeachers] = useState()
    const [studentsByClasa, setStudentsByClasa] = useState()
    const [userById, setUserById] = useState()
    const [loading, setLoading] = useState()
    
    const getStudents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/students`, { withCredentials: true })
            setStudents(response.data)
        } catch (error) {
            
        }
    }

    const getTeachers = async () => {

    }

    const getStudentsByClasa = async () => {

    }

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${id}`, { withCredentials: true })
            setUserById(response.data)
        } catch (err) {
            console.log('hello')
        }
    }

    const updateUsers = async () => {

    }

    const deleteUser = async () => {

    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <UsersContext.Provider value = {{ 
            students, 
            teachers, 
            studentsByClasa,
            loading,
            userById,
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
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const AuthContext = React.createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const login = async (authInfo, setError) => {
        try {
            setError('')
            const res = await axios.post(`${apiUrl}/auth/login`, authInfo, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    
    const register = async (authInfo, setError) => {
        try {
            setError('')
            const res = await axios.post(`${apiUrl}/auth/register`, authInfo, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    
    const logout = async () => {
        try {
            setError('')
            await axios.post(`${apiUrl}/auth/logout`)
            setUser(undefined)
        } catch (error) {
            
        }
    } 

    const getUser = async () => {
        try {
            const res = await axios.get(`${apiUrl}/users/current-user`, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            setUser(undefined)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <AuthContext.Provider value = {{ user, setUser, login, register, logout, getUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
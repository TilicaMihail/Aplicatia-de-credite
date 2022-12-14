import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const AuthContext = React.createContext({})

const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const login = async (authInfo) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, authInfo, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            return error?.response?.data?.message
        }
    }
    
    const register = async (authInfo) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, authInfo, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            return error?.response?.data?.message
        }
    }
    
    const logout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true })
            location.reload()
        } catch (error) {
            console.log(error.message)
        }
    } 

    const getUser = async () => {
        try {
            const res = await axios.get(`${apiUrl}/users/current-user`, { withCredentials: true })
            setUser(res.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setUser(undefined)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <AuthContext.Provider value = {{ user, loading, setUser, login, register, logout, getUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
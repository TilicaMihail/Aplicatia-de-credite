import React from 'react'
import { apiUrl } from '../apiUrl'

const AuthContext = React.createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const login = async (authInfo, setError) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, authInfo)
            setUser(res.data)
        } catch (error) {
            setError(error)
        }
    }
    
    const register = async (authInfo, setError) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, authInfo)
            setUser(res.data)
        } catch (error) {
            setError(error)
        }
    }
    
    const logout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/logout`)
            setUser(undefined)
        } catch (error) {
            
        }
    } 

    const getUser = async () => {
        try {
            const res = await axios.get(`${apiUrl}/users/current-user`)
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

export default AuthContext
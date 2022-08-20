import React from 'react'

const AuthContext = React.createContext({})

const login = (authInfo, setError) => {
    try {
        const res = await axios.post('/login')
    } catch (error) {
        setError(error)
    }
}

const register = (authInfo, setError) => {

}

const logout = () => {
    try {
        const res = await axios.post('/logout')
    } catch (error) {
        
    }
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    return (
        <AuthContext.Provider value = {{user, setUser}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext
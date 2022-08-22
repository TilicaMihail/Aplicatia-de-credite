import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/proiecte')
    }, [loading])

    return (
        <div className = 'h-screen flex items-center justify-center'>
            <LoginForm />
        </div>
    )
}

export default Login
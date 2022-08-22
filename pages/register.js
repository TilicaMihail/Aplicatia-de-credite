import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'

const Register = () => {

    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/proiecte')
    }, [loading])

    return (
        <div className = 'flex items-center justify-center' >
            <RegisterForm />
        </div>
    )
}

export default Register
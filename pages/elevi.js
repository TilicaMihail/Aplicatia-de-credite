import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Layout from '../components/layout/Layout'
import EleviPage from '../components/elevi/EleviPage'

const Elevi = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading])
    
    return (
        <Layout>
            <EleviPage />
        </Layout>
    )
}

export default Elevi
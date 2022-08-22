import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { AuthContext } from '../../contexts/AuthContext'

const Proiecte = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading])
    
    return (
        <Layout>
            proiecte
        </Layout>
    )
}

export default Proiecte
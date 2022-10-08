import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Layout from '../../components/layout/Layout'
import ProfilePage from '../../components/profile/ProfilePage'

const PaginaProfil = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(loading) return
        if(!user && !loading)
            router.push('/login')
        
    }, [loading])

    return (
        <Layout>
            <ProfilePage />
        </Layout>
    )
}

export default PaginaProfil
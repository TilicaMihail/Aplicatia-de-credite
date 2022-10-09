import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Layout from '../../components/layout/Layout'
import InternshipsPage from '../../components/internships/internships-page/InternshipsPage'

const Internships = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading])
    return (
        <Layout>
            <InternshipsPage />
        </Layout>
    )
}

export default Internships;
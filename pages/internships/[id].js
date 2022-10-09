import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Layout from '../../components/layout/Layout'
import InternshipPage from '../../components/internships/internship-details-page/InternshipPage'

const DetaliiInternships = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading])
    
    return (
        <Layout>
            <InternshipPage />
        </Layout>
    )
}

export default DetaliiInternships
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
            <div className = 'bg-red-500 w-40 h-40 shadow-2xl m-10 '>

            </div>
        </Layout>
    )
}

export default Proiecte
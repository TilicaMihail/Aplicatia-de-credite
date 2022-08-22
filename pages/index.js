import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading, user])
    return (
        <div className = 'h-96 w-full bg-red-500'>
            {user?.firstName}
            <br />
            {user?.lastName}
        </div>
    )
}

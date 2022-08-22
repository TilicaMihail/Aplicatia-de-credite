import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const DetaliiProiect = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!user && !loading)
            router.push('/login')
    }, [loading])
    
    return (
        <div>DetaliiProiect</div>
    )
}

export default DetaliiProiect
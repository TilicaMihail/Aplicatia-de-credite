import React from 'react'

const AdaugaProiect = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>AdaugaProiect</div>
    )
}

export default AdaugaProiect
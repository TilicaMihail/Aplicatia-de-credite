import React from 'react'

const DetaliiProiect = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>DetaliiProiect</div>
    )
}

export default DetaliiProiect
import React from 'react'

const DetaliiInternships = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>DetaliiInternships</div>
    )
}

export default DetaliiInternships
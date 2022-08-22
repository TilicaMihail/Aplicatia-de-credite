import React from 'react'

const AdaugaInternship = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>AdaugaInternship</div>
    )
}

export default AdaugaInternship
import React from 'react'

const Profil = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>Profil</div>
    )
}

export default Profil
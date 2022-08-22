import React from 'react'

const Proiecte = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>proiecte</div>
    )
}

export default Proiecte
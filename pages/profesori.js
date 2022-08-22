import React from 'react'

const Profesori = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>profesori</div>
    )
}

export default Profesori
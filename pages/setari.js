import React from 'react'

const Setari = () => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(user && !loading)
            router.push('/')
    }, [loading])
    
    return (
        <div>Setari</div>
    )
}

export default Setari
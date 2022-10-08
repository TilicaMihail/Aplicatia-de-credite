import { info } from 'daisyui/src/colors/colorNames'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { UsersContext } from '../../contexts/UsersContext'

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        img: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })
    const [userFetched, setUserFetched] = useState(false)
    const { user, loading } = useContext(AuthContext)
    const { userById, getUserById } = useContext(UsersContext)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if(!id) return 
        getUserById(id)
    }, [id])

    console.log(userById) 

    return (
        <div>
            <div className = 'flex m-8 gap-8 flex-wrap'>
                <div className = 'flex flex-col bg-white rounded-xl shadow-lg overflow-hidden md:w-1/2 w-full'>
                    <div>
                        <img 
                            className = 'h-20 w-20 rounded-full overflow-hidden border'
                            src = {profileData?.img || 'https://img.myloview.com/stickers/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-400-223068872.jpg'} alt = '' 
                        />
                    </div>
                    <div>
                        <div className = 'grow-0 bg-red-500'> {userById?.firstName} {userById?.lastName} </div>
                        <div className = 'grow-0'>  </div>
                        <div className = 'grow-0'> {userById?.phoneNumber} </div>
                        <div className = 'grow-0'> {userById?.role} </div>
                    </div>
                </div>
                <div className = 'flex flex-col bg-white rounded-xl shadow-lg overflow-hidden grow'>
                    <div>
                        a
                    </div>
                    <div>
                        
                    </div>
                    <div>
                    
                    </div>
                    <div>
                    
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default ProfilePage
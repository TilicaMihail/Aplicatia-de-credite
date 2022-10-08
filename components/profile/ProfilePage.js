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
            <div className = 'flex m-10 gap-8 flex-wrap'>
                <div className = 'flex overflow-hidden w-full p-6 justify-between bg-white rounded-xl shadow-lg'>
                    <div className = 'p-2'>
                        <div className = 'font-bold text-xl md:text-2xl lg:text-4xl'> {userById?.firstName} {userById?.lastName} </div>
                        <div className = 'text-lg'> Email: {userById?.email} </div>
                        <div className = 'text-lg'> Rol: {userById?.role} </div>
                        {
                            userById?.role === 'elev' && 
                            <>
                                <div className = 'text-lg'>
                                    Clasa: {userById?.clasa + userById?.profil}
                                </div>
                                <div className = 'text-lg'>
                                    Credite: {userById?.totalCredite}
                                </div>
                            </>
                        }
                    </div>
                    <div className = 'flex items-center justify-center flex-col gap-2'>
                        <img 
                            className = 'h-28 w-28 rounded-full overflow-hidden border'
                            src = {profileData?.img || 'https://img.myloview.com/stickers/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-400-223068872.jpg'} alt = '' 
                        />
                    </div>
                </div>
                <div className = 'asdf'>

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
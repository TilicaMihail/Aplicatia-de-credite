import axios from 'axios'
import { info } from 'daisyui/src/colors/colorNames'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { apiUrl } from '../../apiUrl'
import { AuthContext } from '../../contexts/AuthContext'
import { InternshipsContext } from '../../contexts/InternshipsContext'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { UsersContext } from '../../contexts/UsersContext'
import AllInternships from '../internships/sections/AllInternships'
import CreatedInternships from '../internships/sections/CreatedInternships'
import SignedUpInternships from '../internships/sections/SignedUpInternships'
import CreatedSection from '../proiecte/sections/CreatedSection'
import SignedUpSection from '../proiecte/sections/SignedUpSection'
import Tabs from '../ui-components/tabs/Tabs'

const ProfilePage = () => {
    const [newPassword, setNewPassword] = useState('')
    const [profileData, setProfileData] = useState({
        img: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })
    const { getCreatedProjects, getSignedUpProjects, setLoading, fetchProjects } = useContext(ProjectsContext)
    const { getCreatedInternships, getSignedUpInternships } = useContext(InternshipsContext)
    const { userById, getUserById } = useContext(UsersContext)
    const { user } = useContext(AuthContext)
    const router = useRouter()
    const { id } = router.query

    const tabs = (
        userById?.role === 'elev' ? 
            [
                { label: 'Proiectele mele', component: <SignedUpSection />},
                { label: 'Proiecte create', component: <CreatedSection />}
            ]
        :
            [
                { label: 'Proiecte create', component: <CreatedSection />}
            ]
    )

    const tabs1 = (
        userById?.role === 'elev' ? 
            [
                { label: 'Internship-urile mele', component: <SignedUpInternships /> }
            ]
        : 
            [
                { label: 'Internship-uri create', component: <CreatedInternships /> }
            ]
    )

    const handleChangePassword = async () => {
        if(newPassword === '') return 
        try {
            const response = await axios.post(`${apiUrl}/auth/change-password`, { password: newPassword }, { withCredentials: true})
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(!id || !user) return 
        const fetch = async () => {
            setLoading(true)
            await getCreatedProjects({ includeArchived: true, clase: ['9', '10', '11', '12'], profile: ['A', 'B'] }, id)
            await getSignedUpProjects({ includeArchived: true, clase: ['9', '10', '11', '12'], profile: ['A', 'B'] }, id)
            await getCreatedInternships(id)
            await getSignedUpInternships(id)
            setLoading(false)
        }
        fetch()
        getUserById(id) 
    }, [id, user])

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
            </div>  
            <div>
                <div className = 'pl-8 pr-8'>
                    <div className = 'font-bold sm:text-2xl text-xl pl-2 pb-3'>
                        Proiecte
                    </div>
                    <Tabs tabs = {tabs} />
                </div>
            </div>
            <div className = 'mb-10'>
                <div className = 'pl-8 pr-8'>
                    <div className = 'font-bold sm:text-2xl text-xl pl-2 pb-3'>
                        Internship-uri
                    </div>
                    <Tabs tabs = {tabs1} />
                </div>
            </div>
            {
                user?._id === id &&
                <div className = 'ml-10 mr-10 mb-10 p-3 bg-white rounded-xl shadow-lg flex items-center' >
                    <input placeholder='Change passoword' type='password' className = 'p-3 border rounded-xl outline-none w-full mr-2' value = {newPassword} onChange = {e => setNewPassword(e.target.value)} />
                    <div className = 'btn btn-info text-white' onClick={handleChangePassword}>
                        Save password
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage
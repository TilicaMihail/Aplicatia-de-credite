import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../layout/Header'
import Tabs from '../../ui-components/tabs/Tabs'
import { UsersContext } from '../../../contexts/UsersContext'
import AllInternships from '../sections/AllInternships'
import SignedUpInternships from '../sections/SignedUpInternships'
import CreatedInternships from '../sections/CreatedInternships'
import { InternshipsContext } from '../../../contexts/InternshipsContext'

const InternshipsPage = () => {
    const { user } = useContext(AuthContext)
    const { fetchInternships } = useContext(InternshipsContext)
    const { getUserById } = useContext(UsersContext)

    useEffect(() => {
        if(!user) return
        fetchInternships()
        getUserById(user?._id)
    }, [user])
    
    const tabs = (
        user?.role === 'elev' ? 
            [
                { label: 'Toate internship-urile', component: <AllInternships /> },
                { label: 'Internship-urile mele', component: <SignedUpInternships /> }
            ]
        : 
            [
                { label: 'Toate internship-urile', component: <AllInternships /> },
                { label: 'Internship-uri create', component: <CreatedInternships /> }
            ]
    )

    return (
        <div>
            <Header />
            <div className = 'p-6'>
                <div className = 'font-bold sm:text-2xl text-xl p-2 pb-3'>
                    Internship-uri
                </div>
                <Tabs tabs = {tabs}/>
            </div>
        </div>
    )
}

export default InternshipsPage
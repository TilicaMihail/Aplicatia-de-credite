import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../layout/Header'
import Tabs from '../../ui-components/tabs/Tabs'
import AdvancedSection from '../sections/AdvancedSection'
import VluntieeringSection from '../sections/VlunteeringSection'
import UnapprovedSection from '../sections/UnapprovedSection'
import SignedUpSection from '../sections/SignedUpSection'
import CreatedSection from '../sections/CreatedSection'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import { UsersContext } from '../../../contexts/UsersContext'

const ProjectsPage = () => {
    const { user } = useContext(AuthContext)
    const { fetchProjects } = useContext(ProjectsContext)
    const { getUserById } = useContext(UsersContext)

    useEffect(() => {
        if(!user) return
        fetchProjects()
        getUserById(user?._id)
    }, [user])
    
    const tabs = (
        user?.role === 'admin' ? 
            [
                { label: 'Avansat', component: <AdvancedSection /> },
                { label: 'Optionale modulare', component: <VluntieeringSection /> },
                { label: 'Neaprobate', component: <UnapprovedSection />},
                { label: 'Proiectele mele', component: <SignedUpSection />},
                { label: 'Proiecte create', component: <CreatedSection />}
            ]
        :
            [
                { label: 'Avansat', component: <AdvancedSection /> },
                { label: 'Optionale modulare', component: <VluntieeringSection /> },
                { label: 'Proiectele mele', component: <SignedUpSection />},
                { label: 'Proiecte create', component: <CreatedSection />}
            ]
    )

    return (
        <div>
            <Header />
            <div className = 'p-6'>
                <div className = 'font-bold sm:text-2xl text-xl p-2 pb-3'>
                    Proiecte
                </div>
                <Tabs tabs = {tabs}/>
            </div>
        </div>
    )
}

export default ProjectsPage
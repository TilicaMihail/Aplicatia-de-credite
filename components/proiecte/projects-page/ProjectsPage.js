import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../layout/Header'
import Tabs from '../../ui-components/tabs/Tabs'
import AdvancedSection from '../sections/AdvancedSection'
import VluntieeringSection from '../sections/VluntieeringSection'
import UnapprovedSection from '../sections/UnapprovedSection'
import SignedUpProjects from '../../stats/SignedUpProjects'
import CreatedProjects from '../../stats/CreatedProjects'

const ProjectsPage = () => {
    const { user } = useContext(AuthContext)
    const tabs = [
        { label: 'Avansat', component: <AdvancedSection /> },
        { label: 'Optionale modulare', component: <VluntieeringSection /> },
        { label: 'Neaprobate', component: <UnapprovedSection />},
        { label: 'Proiectele mele', component: <SignedUpProjects />},
        { label: 'Proiecte create', component: <CreatedProjects />}
    ]

    return (
        <div>
            <Header />
            <div className = 'p-6'>
                <div className = 'font-bold sm:text-2xl text-xl '>
                    Proiecte
                </div>
                <Tabs tabs = {tabs}/>
            </div>
        </div>
    )
}

export default ProjectsPage
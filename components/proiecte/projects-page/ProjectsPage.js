import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../layout/Header'
import Tabs from '../../ui-components/tabs/Tabs'
import AdvancedSection from '../sections/AdvancedSection'
import VluntieeringSection from '../sections/VluntieeringSection'
import UnapprovedSection from '../sections/UnapprovedSection'
import SignedUpSection from '../sections/SignedUpSection'
import CreatedSection from '../sections/CreatedSection'

const ProjectsPage = () => {
    const { user } = useContext(AuthContext)
    const tabs = [
        { label: 'Avansat', component: <AdvancedSection /> },
        { label: 'Optionale modulare', component: <VluntieeringSection /> },
        { label: 'Neaprobate', component: <UnapprovedSection />},
        { label: 'Proiectele mele', component: <SignedUpSection />},
        { label: 'Proiecte create', component: <CreatedSection />}
    ]

    return (
        <div>
            <Header />
            <div className = 'p-6'>
                <div className = 'font-bold sm:text-2xl text-xl p-2'>
                    Proiecte
                </div>
                <Tabs tabs = {tabs}/>
            </div>
        </div>
    )
}

export default ProjectsPage
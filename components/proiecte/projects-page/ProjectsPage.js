import React from 'react'
import Header from '../../layout/Header'
import Tabs from '../../ui-components/tabs/Tabs'

const ProjectsPage = () => {
    const tabs = [
        { label: 'Avansat', component: <></>}
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
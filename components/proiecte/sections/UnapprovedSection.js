import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import  ProjectCard from '../projects-page/project-card/ProjectCard'

const UnapprovedSection = () => {
    const { unapprovedProjects, loading } = useContext(ProjectsContext)

    if(!loading && !unapprovedProjects?.length)
    return (
        <div className = 'text-center pt-10 text-lg'>
            No projects yet!
        </div>
    )

    return (
        <div className = 'flex flex-wrap'>
            {
                unapprovedProjects?.map((project, index) => {
                    return (
                        <div key = {index}>
                            <ProjectCard project = {project} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UnapprovedSection
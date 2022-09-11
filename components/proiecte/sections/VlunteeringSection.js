import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import ProjectCard from '../projects-page/project-card/ProjectCard'

const VlunteeringSection = () => {
    const { volunteeringProjects, loading } = useContext(ProjectsContext) 

    if(!loading && !volunteeringProjects?.length)
    return (
        <div className = 'text-center pt-10 text-lg'>
            No projects yet!
        </div>
    )

    return (
        <div className = 'flex flex-wrap'>
            {
                volunteeringProjects?.map((project, index) => {
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

export default VlunteeringSection
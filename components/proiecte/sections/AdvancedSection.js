import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import ProjectCard from '../projects-page/project-card/ProjectCard'

const AdvancedSection = () => {
    const { advancedProjects } = useContext(ProjectsContext)

    return (
        <div className = 'flex flex-wrap'>
            {
                advancedProjects?.map((project, index) => {
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

export default AdvancedSection
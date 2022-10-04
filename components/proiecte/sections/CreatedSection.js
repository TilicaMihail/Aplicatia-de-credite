import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import ProjectCard from '../projects-page/project-card/ProjectCard'
import { SearchContext } from '../../../contexts/SearchContext'

const CreatedSection = () => {
    const { createdProjects, loading } = useContext(ProjectsContext)
    const { searchFilter } = useContext(SearchContext)

    if(!loading && !createdProjects?.length)
        return (
            <div className = 'text-center pt-10 text-lg'>
                No projects yet!
            </div>
        )

    return (
        <div className = 'flex flex-wrap'>
            {
                createdProjects?.map((project, index) => {
                    if(!project.name.includes(searchFilter)) return 
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

export default CreatedSection
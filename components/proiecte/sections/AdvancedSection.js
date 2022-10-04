import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import { SearchContext } from '../../../contexts/SearchContext'
import ProjectCard from '../projects-page/project-card/ProjectCard'

const AdvancedSection = () => {
    const { advancedProjects, loading } = useContext(ProjectsContext)
    const { searchFilter } = useContext(SearchContext)

    if(!loading && !advancedProjects?.length)
        return (
            <div className = 'text-center pt-10 text-lg'>
                No projects yet!
            </div>
        )

    return (
        <div className = 'flex flex-wrap'>
            {
                advancedProjects?.map((project, index) => {
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

export default AdvancedSection
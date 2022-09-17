import { info } from 'daisyui/src/colors'
import React, { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import ProjectCard from '../projects-page/project-card/ProjectCard'

const SignedUpSection = () => {
    const { signedUpProjects, loading } = useContext(ProjectsContext)

    if(!loading && !signedUpProjects?.length)
        return (
            <div className = 'text-center pt-10 text-lg'>
                No projects yet!
            </div>
        )

    return (
        <div className = 'flex flex-wrap'>
            {
                signedUpProjects?.map((project, index) => {
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

export default SignedUpSection
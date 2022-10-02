import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
import { ProjectsContext } from '../../../../contexts/ProjectsContext'

const ProjectCard = ({ project }) => {
    const { user } = useContext(AuthContext)
    const { signUpToProject, approveProject } = useContext(ProjectsContext)

    return (
        <Link href = {`/proiecte/${project?._id}`}>
            <div className = 'h-70 w-96 rounded-xl overflow-hidden card-hover cursor-pointer m-2 shadow-lg relative'>
                {   
                    project?.students?.[user?._id]?.credite ?
                    <div className = 'transition-all h-10 w-40 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'>
                        { project?.students?.[user?._id]?.credite }
                    </div> :
                    !project?.approved && project?.author !== user?._id ?
                    <div className = 'transition-all h-10 w-40 hover:w-48 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'>
                        Aproba
                    </div> :
                    project?.author === user?._id || user?.role !== 'elev' ?
                    <div></div> 
                    :
                    <div className = 'transition-all h-10 w-40 hover:w-48 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'>
                        Inscrie-te 
                    </div>
                }
                <img src = {
                    project.img || 'http://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'} 
                    className = 'object-cover h-48 w-full' 
                />
                <div className = 'bg-white h-24 border-t  p-2 flex flex-col justify-between '>
                    <div className = 'font-bold text-xl h-8 overflow-hidden'>
                        { project.name } 
                    </div>
                    <div className = 'text-right'>
                        { project.authorName }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
import { ProjectsContext } from '../../../../contexts/ProjectsContext'
import { UsersContext } from '../../../../contexts/UsersContext'

const ProjectCard = ({ project }) => {
    const { userById } = useContext(UsersContext)
    const { signUpToProject, approveProject } = useContext(ProjectsContext)

    return (
        <Link href = {`/proiecte/${project?._id}`}>
            <div className = 'h-70 w-96 rounded-xl overflow-hidden card-hover cursor-pointer m-2 shadow-lg relative'>
                {   
                    project?.students?.[userById?._id]?.credite !== undefined ?
                    <div className = 'transition-all h-10 w-40 absolute top-5 gap-2 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'>
                        { project?.students?.[userById?._id]?.credite }
                        <ion-icon name="trophy"></ion-icon>
                    </div> :
                    !project?.approved && project?.author !== userById?._id ?
                    <div 
                        onClick = {e => { e.stopPropagation(); approveProject(project?._id)}}
                        className = 'transition-all h-10 w-40 hover:w-48 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'
                    >
                        Aproba
                    </div> :
                    project?.author === userById?._id || userById?.role !== 'elev' ?
                    <div></div> 
                    :
                    <div
                        onClick = {(e) => {e.stopPropagation(); signUpToProject(project?._id)}} 
                        className = 'transition-all h-10 w-40 hover:w-48 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'
                    >
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
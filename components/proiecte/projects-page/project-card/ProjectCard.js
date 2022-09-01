import Link from 'next/link'
import React from 'react'

const ProjectCard = ({ project }) => {
    console.log(project)
    return (
        <Link href = {`/proiecte/${project?._id}`}>
            <div className = 'h-64 w-80 rounded-xl overflow-hidden card-hover cursor-pointer'>
                <img src = {
                    project.img || 'http://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'} 
                    className = 'object-cover h-52 w-full' 
                />
                <div className = 'bg-black h-12'>

                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
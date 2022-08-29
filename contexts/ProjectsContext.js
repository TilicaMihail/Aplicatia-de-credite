import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const ProjectsContext = React.createContext({})

const ProjectsProvider = ({ children }) => {
    const [advancedProjects, setAdvancedProjects] = useState([]);
    const [unapprovedProjects, setUnapprovedProjects] = useState([]);
    const [voluntieeringProjects, setVoluntieeringProjects] = useState([]);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [signedUpProjects, setSignedUpProjects] = useState([]);
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(false)

    const getAdvancedProjects = async () => {

    }

    const getUnapprovedProjects = async () => {
        
    }

    const getVoluntieeringProjects = async () => {
        
    }

    const getCreatedProjects = async () => {

    }

    const getSignedUpProjects = async () => {
        
    }

    const getProjectById = async () => {

    }

    const approveProject = async () => {

    }

    const singUpToProject = async () => {

    }

    const gradeUser = async () => {

    }

    const markStudentPresent = async () => {

    }

    const createProject = async () => {

    }

    const updateProject = async () => {

    }

    const deleteProject = async () => {
        
    }


    useEffect(() => {
        
    }, [])

    return (
        <ProjectsContext.Provider 
            value = {{ 
                advancedProjects, 
                unapprovedProjects, 
                voluntieeringProjects,
                createdProjects, 
                signedUpProjects,
                project,
                loading,
                
            }}
        >
            { children }
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider
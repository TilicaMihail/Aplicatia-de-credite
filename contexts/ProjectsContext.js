import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'
import { AuthContext } from './AuthContext'

export const ProjectsContext = React.createContext({})

const ProjectsProvider = ({ children }) => {
    const [advancedProjects, setAdvancedProjects] = useState([]);
    const [unapprovedProjects, setUnapprovedProjects] = useState([]);
    const [voluntieeringProjects, setVoluntieeringProjects] = useState([]);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [signedUpProjects, setSignedUpProjects] = useState([]);
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)

    const { user } = useContext(AuthContext)

    const getAdvancedProjects = async (query) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/advanced`, { 
                params: query, 
                withCredentials: true
            })
            setAdvancedProjects(response.data)
        } catch (error) {
            return error?.response?.data.message
        }
    }

    const getUnapprovedProjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/projects/unapproved`, { 
                withCredentials: true
            })
            setUnapprovedProjects(response.data)
        } catch (error) {
            return error?.response?.data.message
        }
    }

    const getVoluntieeringProjects = async (query) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/voluntieering`, { 
                params: query, 
                withCredentials: true
            })
            setVoluntieeringProjects(response.data)
        } catch (error) {
            return error?.response.data.message
        }
    }

    const getCreatedProjects = async (query, id) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/created-projects/${id}`, { 
                params: query, 
                withCredentials: true
            })
            setCreatedProjects(response.data)
        } catch (error) {
            return error?.response.data.message
        }
    }

    const getSignedUpProjects = async (query, id) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/signed-up-projects/${id}`, { 
                params: query, 
                withCredentials: true
            })
            setSignedUpProjects(response.data)
        } catch (error) {
            return error?.response.data.message
        }
    }

    const getProjectById = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/${id}`, { 
                withCredentials: true
            })
            setProject(response.data)
        } catch (error) {
            return error?.response.data.message
        }
    }

    const approveProject = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const signUpToProject = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const gradeUser = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const markStudentPresent = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const createProject = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const updateProject = async (body, id) => {
        try {
            const response = await axios.put(`${apiUrl}/projects/${id}`, {
                withCredentials: true,
            })

        } catch (error) {
            return error?.response.data.message
        }
    }

    const deleteProject = async (id) => {
        try {
            await axios.delete(`${apiUrl}/projects/${id}`, { 
                withCredentials: true
            })
            if(id === project._id)
                setProject() 
            setAdvancedProjects((prev) => (prev.filter(item => item._id !== id)))
            setUnapprovedProjects((prev) => (prev.filter(item => item._id !== id)))
            setVoluntieeringProjects((prev) => (prev.filter(item => item._id !== id)))
            setCreatedProjects((prev) => (prev.filter(item => item._id !== id)))
            setSignedUpProjects((prev) => (prev.filter(item => item._id !== id)))
        } catch (error) {
            return error?.response.data.message
        }
    }


    useEffect(() => {
        const fetchProjects = async () => {
            if(!user)
                return 
            setLoading(true);
            await getUnapprovedProjects();
            await getAdvancedProjects({ 
                includeArchived: false, 
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            });
            await getVoluntieeringProjects({ 
                includeArchived: false, 
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            });
            await getCreatedProjects({
                includeArchived: false,
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            }, user._id);
            await getSignedUpProjects({
                includeArchived: false,
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            }, user._id);
            setLoading(false);
        }
        fetchProjects()
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
                setLoading,
                getAdvancedProjects,
                getUnapprovedProjects,
                getVoluntieeringProjects,
                getCreatedProjects,
                getSignedUpProjects,
                getProjectById,
                approveProject,
                signUpToProject,
                gradeUser,
                markStudentPresent,
                createProject,
                updateProject,
                deleteProject,
            }}
        >
            { children }
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider
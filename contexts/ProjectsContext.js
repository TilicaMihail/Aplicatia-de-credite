import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'
import { AuthContext } from './AuthContext'

export const ProjectsContext = React.createContext({})

const ProjectsProvider = ({ children }) => {
    const [allProjects, setAllProjects] = useState([])
    const [advancedProjects, setAdvancedProjects] = useState([]);
    const [unapprovedProjects, setUnapprovedProjects] = useState([]);
    const [volunteeringProjects, setVolunteeringProjects] = useState([]);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [signedUpProjects, setSignedUpProjects] = useState([]);
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const getAllProjects = async (query) => {
        try {
            const projects = await axios.get(`${apiUrl}/projects/`, { withCredentials: true, params: query })
            await setAllProjects(projects.data)
        } catch (error) { 

        }
    }

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

    const getVolunteeringProjects = async (query) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/volunteering`, { 
                params: query, 
                withCredentials: true
            })
            setVolunteeringProjects(response.data)
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

    const approveProject = async (id) => {
        try {
            await axios.post(`${apiUrl}/projects/approve/${id}`, {}, { withCredentials: true})
            setUnapprovedProjects(prev => (prev.filter(item => item._id !== id )))
            await getAdvancedProjects({ 
                includeArchived: false, 
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            });
            await getVolunteeringProjects({ 
                includeArchived: false, 
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            });
        } catch (error) {
            
        }
    }

    const signUpToProject = async (id, userId) => {
        try {
            const response = await axios.post(`${apiUrl}/projects/sign-up/${id}`, { userId: userId }, { withCredentials: true })
            setAdvancedProjects(prev => (prev.filter(item => item._id !== id )))
            setVolunteeringProjects(prev => (prev.filter(item => item._id !== id )))
            await getSignedUpProjects({
                includeArchived: false,
                clase: user.role === 'elev' ? 
                    [user.clasa] : 
                    ['9', '10', '11', '12'],
                profile: user.role === 'elev' ? 
                    [user.profil]: 
                    ['A', 'B'],
            }, user._id);
        } catch (error) {
            
        }
    }

    const gradeUser = async (projectId, userId, credite) => {
        try {
            const response = await axios.post(`${apiUrl}/projects/grade/${projectId}`, { userId: userId, credite: credite }, { withCredentials: true })
            setProject(response.data)
        } catch (error) {
            
        }
    }

    const markStudentPresent = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const createProject = async (body) => {
        try {
            const response = await axios.post(`${apiUrl}/projects/`, body, { withCredentials: true})
            setCreatedProjects(prev => [...prev, response.data])
            router.push('/proiecte')
        } catch (error) {
            
        }
    }

    const updateProject = async (body, id) => {
        try {
            const response = await axios.put(`${apiUrl}/projects/${id}`, body, {
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
            setVolunteeringProjects((prev) => (prev.filter(item => item._id !== id)))
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
            await getVolunteeringProjects({ 
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
    }, [user])

    return (
        <ProjectsContext.Provider 
            value = {{ 
                allProjects,
                advancedProjects, 
                unapprovedProjects, 
                volunteeringProjects,
                createdProjects, 
                signedUpProjects,
                project,
                loading,
                setLoading,
                getAllProjects,
                getAdvancedProjects,
                getUnapprovedProjects,
                getVolunteeringProjects,
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
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'
import { AuthContext } from './AuthContext'

export const InternshipsContext = React.createContext({})

const InternshipsProvider = ({ children }) => {
    const [createdInternships, setCreatedInternships] = useState([])
    const [signedUpInternships, setSignedUpInternships] = useState([])
    const [internships, setInternships] = useState([])
    const [internship, setInternship] = useState()
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const router = useRouter()

    const getInternships = async () => {
        try {
            const response = await axios.get(`${apiUrl}/internships`, { withCredentials: true })
            setInternships(response.data)
        } catch (error) {
            
        }
    }

    const getCreatedInternships = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/internships/created-internships/${id}`, { withCredentials: true })
            setCreatedInternships(response.data)
        } catch (error) {
            
        }
    }

    const getSignedUpInternships = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/internships/signed-up-internships/${id}`, { withCredentials: true })
            console.log(response.data, 'this is context')
            setSignedUpInternships(response.data)
        } catch (error) {
            
        }
    }

    const getInternshipById = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/internships/${id}`, { withCredentials: true })
            setInternship(response.data)
        } catch (error) {
            
        }
    }

    const createInternship = async (body) => {
        try {
            const response = await axios.post(`${apiUrl}/internships`, body, { withCredentials: true})
            setCreatedInternships(prev => [...prev, response.data])
            router.push('/internships')
        } catch (error) {
            return error?.response?.data?.message
        }
    }

    const signUpToInternship = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/internships/sign-up/${id}`, {}, { withCredentials: true })
            setInternships(prev => (prev.filter(item => item._id !== id )))
            await getSignedUpInternships(user?._id)
        } catch (error) {
            
        }
    }

    const updateInternship = async (id, body) => {
        try {
            const response = await axios.put(`${apiUrl}/internships/${id}`, body, { withCredentials: true })
            return response.data
        } catch (error) {
            
        }
    }

    const deleteInternship = async (id) => {
        try {
            await axios.delete(`${apiUrl}/internships/${id}`, { withCredentials: true }) 
            setInternships(prev => (prev.filter(item => item._id !== id )))
        } catch (error) {
            
        }
    }

    const fetchInternships = async () => {
        try {
            setLoading(true)
            await getInternships()
            await getCreatedInternships(user?._id);
            await getSignedUpInternships(user?._id)
            setLoading(false)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <InternshipsContext.Provider value = {{ 
            createdInternships,
            signedUpInternships,
            internship,
            internships,
            setInternship,
            getCreatedInternships,
            getSignedUpInternships,
            getInternshipById,
            createInternship,
            signUpToInternship,
            updateInternship,
            deleteInternship,
            getInternships,
            fetchInternships,
        }}>
            { children }
        </InternshipsContext.Provider>
    )
}

export default InternshipsProvider
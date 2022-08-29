import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../apiUrl'

export const InternshipsContext = React.createContext({})

const InternshipsProvider = ({ children }) => {
    const [createdInternships, setCreatedInternships] = useState()
    const [signedUpInternships, setSignedUpInternships] = useState()
    const [internship, setInternship] = useState()

    const getCreatedInternships = async () => {

    }

    const getSignedUpInternships = async () => {

    }

    const getInternshipById = async () => {

    }

    const createInternship = async () => {

    }

    const signUpToInternship = async () => {

    }

    const updateInternship = async () => {

    }

    const deleteInternship = async () => {

    }

    useEffect(() => {
        
    }, [])

    return (
        <InternshipsContext.Provider value = {{ 
            createdInternships,
            signedUpInternships,
            internship,
            getCreatedInternships,
            getSignedUpInternships,
            getInternshipById,
            createInternship,
            signUpToInternship,
            updateInternship,
            deleteInternship,
        }}>
            { children }
        </InternshipsContext.Provider>
    )
}

export default InternshipsProvider
import React, { useContext } from 'react'
import { InternshipsContext } from '../../../contexts/InternshipsContext'
import { SearchContext } from '../../../contexts/SearchContext'
import InternshipCard from '../internships-page/internship-card/InternshipCard'

const SignedUpInternships = () => {
    const { signedUpInternships, loading } = useContext(InternshipsContext)
    const { searchFilter } = useContext(SearchContext)

    if(!loading && !signedUpInternships?.length)
        return (
            <div className = 'text-center pt-10 text-lg'>
                No internships yet!
            </div>
        )

    return (
        <div className = 'flex flex-wrap'>
            {
                signedUpInternships?.map((internship, index) => {
                    if(!internship.name.includes(searchFilter)) return 
                    return (
                        <div key = {index}>
                            <InternshipCard internship = {internship} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SignedUpInternships
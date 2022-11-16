import React, { useContext } from 'react'
import { InternshipsContext } from '../../../contexts/InternshipsContext'
import { SearchContext } from '../../../contexts/SearchContext'
import InternshipCard from '../internships-page/internship-card/InternshipCard'

const AllInternships = () => {
    const { internships, loading } = useContext(InternshipsContext)
    const { searchFilter } = useContext(SearchContext)

    if(!loading && !internships?.length)
        return (
            <div className = 'text-center pt-10 text-lg'>
                No internships yet!
            </div>
        )

    return (
        <div className = 'flex flex-wrap'>
            {
                internships?.map((internship, index) => {
                    if(!internship.name.toLowerCase().includes(searchFilter.toLowerCase())) return 
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

export default AllInternships
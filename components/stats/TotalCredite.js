import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../apiUrl'

const TotalCredite = () => {
    const [data, setData] = useState(0)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${apiUrl}/stats/credits-count`, { withCredentials: true })
                setData(data.data.count)
            } catch (err) {
                
            }
        }
        fetchData()
    }, [])

    return (
        <div className = 'bg-white rounded-xl w-[24vw] p-2'>
            <div className = 'text-sm sm:text-md md:text-lg font-bold'>
                Credite
            </div>
            <div className = 'text-sm sm:text-md md:text-lg font-bold'>
                {data} p
            </div>
        </div>
    )
}

export default TotalCredite
import Link from 'next/link'
import React, { useContext } from 'react'
import { InternshipsContext } from '../../../../contexts/InternshipsContext'
import { UsersContext } from '../../../../contexts/UsersContext'

const InternshipCard = ({ internship }) => {
    const { userById } = useContext(UsersContext)
    const { signUpToInternship } = useContext(InternshipsContext)

    return (
        <Link href = {`/proiecte/${internship?._id}`}>
            <div className = 'h-70 w-96 rounded-xl overflow-hidden card-hover cursor-pointer mr-4 mb-4 shadow-lg relative'>
                {   
                    internship?.students?.[userById?._id]?.credite !== undefined ?
                    <div className = 'transition-all h-10 w-40 absolute top-5 gap-2 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'>
                        { internship?.students?.[userById?._id]?.credite }
                        <ion-icon name="trophy"></ion-icon>
                    </div> :
                    internship?.author === userById?._id || userById?.role !== 'elev' ?
                    <div></div> 
                    :
                    <div
                        onClick = {(e) => {e.stopPropagation(); signUpToProject(internship?._id)}} 
                        className = 'transition-all h-10 w-40 hover:w-48 absolute top-5 left-0 bg-blue-400 font-bold text-white text-lg flex items-center justify-center rounded-r'
                    >
                        Inscrie-te 
                    </div>
                }
                <img src = {
                    internship?.img || 'http://unblast.com/wp-content/uploads/2020/05/Back-to-School-Illustration.jpg'} 
                    className = 'object-cover h-48 w-full' 
                />
                <div className = 'absolute bottom-[100px] right-0 bg-white p-1 rounded-l'>
                    Pret: { internship?.price } credite
                </div>
                <div className = 'bg-white h-24 border-t  p-2 flex flex-col justify-between '>
                    <div className = 'font-bold text-xl h-8 overflow-hidden'>
                        { internship.name } 
                    </div>
                    <div className = 'text-right'>
                        { internship.authorName }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default InternshipCard
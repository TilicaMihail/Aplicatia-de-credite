import Link from 'next/link'
import React from 'react'

const Elev = ({ student, index }) => {
    return (
        <Link href = {`/profil/${student?._id}`}>
            <div className = 'w-full p-3 bg-white shadow-lg rounded-xl flex justify-between card-hover '>
                <div className = 'font-bold flex item-center justify-center'>
                    <div className = 'pr-3'>
                        {
                            index === 0 ? 
                                <img src = {'https://i.pinimg.com/originals/86/d9/64/86d9642da31c8ebb28cb0ea5693b08eb.png'} alt = '' className = 'h-6' />
                            : index === 1 ? 
                                <div>
                                    <img src = {'https://bjstrophy.com/image/cache/catalog/FE%20Medals/FE-282-700x700.jpg'} alt = '' className = 'h-6' />
                                </div>
                            : index === 2 ?
                                <div>
                                    <img src = {'https://www.pngall.com/wp-content/uploads/4/Third-Place-PNG-Picture.png'} alt = '' className = 'h-6' />
                                </div>
                            :
                                index  + 1 + '. '
                        }
                    </div>
                    <div>
                        { student?.firstName + ' ' + student.lastName}
                    </div>
                </div>
                <div className = 'flex items-center gap-4'>
                    { student?.totalCredite}
                    <ion-icon name="trophy-outline"></ion-icon>
                </div>
            </div>
        </Link>
    )
}

export default Elev
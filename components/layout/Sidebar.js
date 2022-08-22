import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';

const sidebarData = [
    {
        name: 'Proiecte',
        url: '/proiecte',
        icon: <ion-icon name="folder-outline"></ion-icon>
    },
    {
        name: 'Internship-uri',
        url: '/internships',
        icon: <ion-icon name="ribbon-outline"></ion-icon>
    },
    {
        name: 'Elevi',
        url: '/elevi',
        icon: <ion-icon name="school-outline"></ion-icon>
    },
    {
        name: 'Adauga proiect',
        url: '/adauga-proiect',
        icon: <ion-icon name="add-circle-outline"></ion-icon>
    },
    {
        name: 'Adauga internship',
        url: '/adauga-internship',
        icon: <ion-icon name="cube-outline"></ion-icon>
    },
    {
        name: 'Contul meu',
        url: '/profil',
        icon: <ion-icon name="person-outline"></ion-icon>
    },
    {
        name: 'Setari',
        url: '/setari',
        icon: <ion-icon name="settings-outline"></ion-icon>
    },
]

const Sidebar = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext)

    return (
        <div className = 'h-screen w-60 shadow-lg bg-white flex flex-col justify-between'>
            <div>
                <div className = 'flex flex-col items-center justify-center pt-10 pb-8 '>
                    <div className = 'rounded-full overlfow-hidden bg-black h-20 w-20'>

                    </div>
                    <div className = 'font-bold text-lg pt-2'>
                        Aplicatia de credite
                    </div>
                </div>
                <div>
                    {
                        sidebarData.map((item) => {
                            if(item.name === 'Adauga internship' && user?.role === 'elev')
                                return 
                            return (
                                <Link href={item.url} key = {item.name} >
                                    <div 
                                        
                                        className = {' flex btn-hover cursor-pointer p-2 pl-4  ' + (!(router.pathname === item.url) && ' border-l-[5px] border-white ') + (router.pathname === item.url && ' font-bold border-l-[5px] border-black')}
                                    > 
                                        <div className = 'text-2xl pr-2 flex items-center justify-center'>
                                            {item.icon}
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className = 'pb-10 flex items-center justify-center'>
                <img 
                    className = 'h-10 w-10 rounded-full border mr-2'
                    src = {user?.img || 'https://img.myloview.com/stickers/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-400-223068872.jpg'} alt = ''
                />
                {user?.firstName} {' '}
                {user?.lastName}
            </div>
        </div>
    )
}

export default Sidebar
import { Drawer } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';

const SidebarComponent = ({ smallScreen}) => {
    const router = useRouter();
    const { user } = useContext(AuthContext)

    const sidebarData = [
        {
            name: 'Proiecte',
            url: '/proiecte',
            prefix: '/proiecte',
            icon: <ion-icon name="folder-outline"></ion-icon>
        },
        {
            name: 'Internship-uri',
            url: '/internships',
            prefix: '/internships',
            icon: <ion-icon name="ribbon-outline"></ion-icon>
        },
        {
            name: 'Elevi',
            url: '/elevi',
            prefix: '/elevi',
            icon: <ion-icon name="school-outline"></ion-icon>
        },
        {
            name: 'Adauga proiect',
            url: '/adauga-proiect',
            prefix: '/adauga-proiect',
            icon: <ion-icon name="add-circle-outline"></ion-icon>
        },
        {
            name: 'Adauga internship',
            url: '/adauga-internship',
            prefix: '/adauga-internship',
            icon: <ion-icon name="cube-outline"></ion-icon>
        },
        {
            name: 'Profil',
            url: `/profil/${user?._id}`,
            prefix: '/profil',
            icon: <ion-icon name="person-outline"></ion-icon>
        },
        {
            name: 'Setari',
            url: '/setari',
            prefix: '/setari',
            icon: <ion-icon name="settings-outline"></ion-icon>
        },
    ]

    return (
        <div className = {'h-screen w-60 shadow-lg bg-white flex flex-col justify-between ' + (!smallScreen && ' fixed')}>
            <div>
                <div className = 'flex flex-col items-center justify-center pt-10 pb-8 '>
                    <div className = ''>
                        <img src = {'https://festivalsfr.ro/wp-content/uploads/2020/08/Logo-Liceul-Varlaam_orizontal-01-300x136.png'} alt = '' className = 'rounded-full overlfow-hidden h-20 w- overflow-hidden' />
                    </div>
                    {/* <div className = 'font-bold text-lg pt-2'>
                        Aplicatia de credite
                    </div> */}
                </div>
                <div>
                    {
                        sidebarData.map((item) => {
                            if(item.name === 'Adauga internship' && user?.role === 'elev')
                                return 
                            return (
                                <Link href={item.url} key = {item.name} >
                                    <div 
                                        
                                        className = {' flex btn-hover cursor-pointer p-2 pl-4  ' + (!(router.pathname?.includes(item.prefix)) && ' border-l-[5px] border-white ') + (router.pathname?.includes(item.prefix) && ' font-bold border-l-[5px] border-black')}
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

const Sidebar = ({ open, setOpen}) => {
    const { width, height } = useWindowSize()

    if(width < 640)
        return (
            <Drawer
                open = {open}
                onClose = {e => setOpen(false)}
            >
                <SidebarComponent  smallScreen={true}/>
            </Drawer>
        )

    return (
        <SidebarComponent />
    )
}

export default Sidebar
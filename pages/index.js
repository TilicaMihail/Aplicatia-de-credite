import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
    const { user } = useContext(AuthContext)
    return (
        <div className = 'h-96 w-full bg-red-500'>
            {user?.firstName}
            <br />
            {user?.lastName}
        </div>
    )
}

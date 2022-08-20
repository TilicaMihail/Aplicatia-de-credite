import Link from 'next/link'
import React, { useState } from 'react'
import { classes } from '../../utils/classes'
import RoleSelect from '../inputs/RoleSelect'
import ProfilSelect from '../inputs/ProfilSelect'
import ClasaSelect from '../inputs/ClasaSelect'

const RegisterForm = () => {
    const [role, setRole] = useState({ value: 'elev', label: 'elev' })
    const [profil, setProfil] = useState({ value: 'A', label: 'A' })
    const [clasa, setClasa] = useState({ value: 9, label: '9' })
    const [error, setError] = useState('')

    return (
        
        <div className = 'grow m-10 flex max-w-xl flex-col rounded-xl overflow-hidden border bg-gray-50 shadow-md'>
            <div>                    
                <img className = 'w-full bg-red-500 h-[100px] object-cover overflow-hidden' src = {'https://img.freepik.com/premium-vector/back-school-with-books-education-research-concept-illustration_1893-2704.jpg?w=2000'} alt = '' />
            </div>
            <div className = 'flex w-full p-6 flex-col gap-5 h-full justify-between '>
                <div>
                    <div className = 'pb-10'>
                        <div className = 'text-2xl font-bold'>
                            Inscrie-te
                        </div>
                        <div>
                            Intra in aplicatia de credite
                        </div>
                    </div>
                    <form className = 'flex flex-col gap-5'>
                        <input 
                            type="text" 
                            placeholder="Enter the first name" 
                            className="input input-info w-full" 
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the last name" 
                            className="input input-info w-full" 
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the phone number" 
                            className="input input-info w-full" 
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the email" 
                            className="input input-info w-full" 
                        />
                        <input 
                            type="password" 
                            placeholder="Enter the master password" 
                            className="input input-bordered input-info w-full" 
                        />
                        <RoleSelect value = {role} setValue = {setRole}/>
                        {
                            role.value === 'elev' && 
                            <>
                                <ClasaSelect value = {clasa} setValue = {setClasa} />
                                <ProfilSelect value = {profil} setValue = {setProfil} />
                            </>
                        }
                    </form>
                    <div className = 'p-2 text-center'>
                        Already have an account? 
                        <Link href = '/login'>
                            <span className = 'p-1 text-blue-500 font-bold cursor-pointer'>
                                Login
                            </span>
                        </Link>
                    </div>
                    <div>

                    </div>
                </div>
                <div className = 'text-red-500 font-bold text-center'>
                    {error}
                </div>
                <button className = {classes.btnSuccess}>
                    Inscrie-te
                </button>
            </div>
        </div>
    )
}

export default RegisterForm
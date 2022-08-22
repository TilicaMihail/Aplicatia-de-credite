import Link from 'next/link'
import React, { useContext, useState } from 'react'
import RoleSelect from '../inputs/RoleSelect'
import ProfilSelect from '../inputs/ProfilSelect'
import ClasaSelect from '../inputs/ClasaSelect'
import { AuthContext } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { info } from 'daisyui/src/colors/colorNames'

const RegisterForm = () => {
    const [role, setRole] = useState({ value: 'elev', label: 'elev' })
    const [profil, setProfil] = useState({ value: 'A', label: 'A' })
    const [clasa, setClasa] = useState({ value: 9, label: '9' })
    const [firstName, setFirstName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { register } = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = await register({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            masterPassword: password,
            role: role.value,
            profil: profil.value,
            clasa: clasa.value,
        })
        setError(err)
        if(!err)
            router.push('/')
    }

    return (
        
        <div className = 'grow m-10 flex max-w-xl flex-col rounded-xl overflow-hidden border bg-gray-50 shadow-md'>
            <div>                    
                <img className = 'w-full bg-red-500 h-[100px] object-cover overflow-hidden' src = {'https://img.freepik.com/premium-vector/back-school-with-books-education-research-concept-illustration_1893-2704.jpg?w=2000'} alt = '' />
            </div>
            <form onSubmit = {handleSubmit} className = 'flex w-full p-6 flex-col gap-5 h-full justify-between '>
                <div>
                    <div className = 'pb-10'>
                        <div className = 'text-2xl font-bold'>
                            Inscrie-te
                        </div>
                        <div>
                            Intra in aplicatia de credite
                        </div>
                    </div>
                    <div className = 'flex flex-col gap-5'>
                        <input 
                            value = {firstName}
                            onChange = {e => setFirstName(e.target.value)}
                            type="text" 
                            placeholder="Enter the first name" 
                            className="input input-info w-full" 
                        />
                        <input 
                            value = {lastName}
                            onChange = {e => setLastName(e.target.value)}
                            type="text" 
                            placeholder="Enter the last name" 
                            className="input input-info w-full" 
                        />
                        <input 
                            value = {phoneNumber}
                            onChange = {e => setPhoneNumber(e.target.value)}
                            type="text" 
                            placeholder="Enter the phone number" 
                            className="input input-info w-full" 
                        />
                        <input 
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                            type="text" 
                            placeholder="Enter the email" 
                            className="input input-info w-full" 
                        />
                        <input 
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
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
                    </div>
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
                <button type = 'submit' className = {'btn btn-success text-white w-full'}>
                    Inscrie-te
                </button>
            </form>
        </div>
    )
}

export default RegisterForm
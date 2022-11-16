import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login, user } = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const err = await login({ email: email, password: password}, setError)
        setError(err)
        if(!err)
            router.push('/')
    }

    return (
        <div className = 'm-10 grow flex flex-col md:flex-row max-w-2xl rounded-xl overflow-hidden border bg-gray-50 shadow-md'>
            <div>                    
                <img className = 'w-full bg-red-500 h-[100px] object-cover md:h-[400px] overflow-hidden' src = {'https://img.freepik.com/premium-vector/back-school-with-books-education-research-concept-illustration_1893-2704.jpg?w=2000'} alt = '' />
            </div>
            <form 
                onSubmit = {handleSubmit}
                className = 'flex w-full p-5 flex-col gap-5 h-full justify-between md:h-[400px]'>
                <div>
                    <div className = 'pb-10'>
                        <div className = 'text-2xl font-bold'>
                            Autentificare
                        </div>
                        <div>
                            Intra in aplicatia de credite
                        </div>
                    </div>
                    <div className = 'flex flex-col gap-5'>
                        <input 
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                            required
                            type="text" 
                            placeholder="Enter your email" 
                            className="input input-info w-full bg-white" 
                        />
                        <input 
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                            required
                            type="password" 
                            placeholder="Enter your password" 
                            className="input input-bordered input-info w-full bg-white" 
                        />
                    </div>
                </div>
                <div className = 'font-bold text-red-500 text-center'>
                    {error}
                </div>
                <button className = {'btn btn-success text-white w-full'} type="submit">
                    Login
                </button>
            </form> 
        </div>
    )
}

export default LoginForm
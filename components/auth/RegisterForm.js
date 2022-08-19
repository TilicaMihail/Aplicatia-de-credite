import Link from 'next/link'
import React from 'react'
import { classes } from '../../utils/classes'
import Select from 'react-select'

const RegisterForm = () => {
    return (
        <div className = 'm-10 grow flex flex-col md:flex-row max-w-xl rounded-xl overflow-hidden border bg-gray-50 shadow-md'>
            <div>                    
                <img className = 'w-full bg-red-500 h-[100px] object-cover md:h-[400px] overflow-hidden' src = {'https://img.freepik.com/premium-vector/back-school-with-books-education-research-concept-illustration_1893-2704.jpg?w=2000'} alt = '' />
            </div>
            <div className = 'flex w-full p-5 flex-col gap-5 h-full justify-between md:h-[400px]'>
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
                            type="text" 
                            placeholder="Enter your email" 
                            class="input input-info w-full" 
                        />
                        <input 
                            type="password" 
                            placeholder="Enter the master password" 
                            class="input input-bordered input-info w-full" 
                        />

                    </div>
                    <div className = 'p-2 text-center'>
                        Already have an account? 
                        <Link href = '/login'>
                            <span className = 'p-1 text-blue-500 font-bold'>
                                Login
                            </span>
                        </Link>
                    </div>
                    <div>

                    </div>
                </div>
                <button className = {classes.btnSuccess}>
                    Inscrie-te
                </button>
            </div>
        </div>
    )
}

export default RegisterForm
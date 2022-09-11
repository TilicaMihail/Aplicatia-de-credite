import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { DatePicker } from '@mantine/dates';
import makeAnimated from 'react-select/animated';
import { ProjectsContext } from '../../../contexts/ProjectsContext';
import { NumberInput } from '@mantine/core';

const AddProjectPage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('https://i.pinimg.com/originals/15/81/8f/15818f789d48bdc13ca560aa7d6c8606.jpg')
    const [finalDate, setFinalDate] = useState('')
    const [signUpDateLimit, setSignUpDateLimit] = useState('')
    const [maxNumberStudenst, setMaxNumberStudenst] = useState(10000)
    const [maxNumberCredits, setMaxNumberCredits] = useState(100)
    const [signUpDependsOn, setSignUpDependsOn] = useState({})
    const [options, setOptions] = useState([])

    const { allProjects, getAllProjects, createProject } = useContext(ProjectsContext)

    useEffect(() => {
        const getOptions = async () => {
            await getAllProjects()
            setOptions(allProjects.map((project) => {

            }))
        }
        getOptions()
    }, [])

    return (
        <div className = 'p-8 sm:pt-12 pt-16 '>
            <div className = 'font-bold text-xl sm:text-2xl'>
                Adauga un proiect
            </div>
            <div className = 'bg-white rounded-xl mt-12 w-full flex overflow-hidden flex-col relative shadow-md'>
                <div>
                    <img src = {img} alt = '' className = 'w-full object-cover h-52' />
                    <button className = 'btn btn-info absolute top-[20px] right-[20px] text-3xl p-2 text-white'>
                        <ion-icon name="image-outline"></ion-icon>
                    </button>
                </div>
                <div className = 'flex flex-col p-3'>
                    <input className = 'outline-none text-xl lg:text-3xl md:text-2xl p-2' value = {name} onChange = {e => setName(e.target.value)} placeholder = "Nume proiect"/>
                    <textarea className = ' resize-none outline-none p-2 h-24 text-sm lg:text-base' value = {description} onChange = {e => setDescription(e.target.value)} placeholder = "Descriere proiect"/>
                </div>
            </div>
            <div className = 'bg-white rounded-xl mt-12 w-full flex flex-col relative shadow-md'>
                <div className = 'flex flex-col p-5'>
                    <div className = 'text-xl font-bold'>
                        Filtre inscriere
                    </div>
                    <div>
                        <div className = 'p-2'>
                            <DatePicker placeholder="Pick date" label="Limita data inscriere" value = {signUpDateLimit} onChange = {e => setSignUpDateLimit(e)} />
                        </div>
                        <div className = 'p-2'>
                            <DatePicker placeholder="Pick date" label="Data finala" value = {signUpDateLimit} onChange = {e => setSignUpDateLimit(e)} />
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Numar maxim elevi' value = {maxNumberStudenst} onChange = {val => setMaxNumberStudenst(val)} />
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Numar maxim credite' value = {maxNumberCredits} onChange = {val => setMaxNumberCredits(val)}/>
                        </div>
                        <div className = 'p-2 pt-3'>
                            <div className = 'text-sm'>
                                Inscrierea depinde de participarea la
                            </div>
                            <Select 
                                options = {options}
                                isMulti
                                closeMenuOnSelect = {false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'flex items-center justify-center mt-12'> 
                <button className = 'text-lg grow max-w-xl btn btn-info text-white font-bold m-2 ' >
                    Adauga un proiect
                </button>
            </div>
        </div>
    )
}

export default AddProjectPage
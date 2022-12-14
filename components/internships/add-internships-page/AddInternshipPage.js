import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { DatePicker } from '@mantine/dates';
import makeAnimated from 'react-select/animated';
import { ProjectsContext } from '../../../contexts/ProjectsContext';
import { NumberInput } from '@mantine/core';
import ImagePicker from '../../ui-components/modals/ImagePicker';
import { InternshipsContext } from '../../../contexts/InternshipsContext';

const claseOptions = [
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
]

const profileOptions = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
]

const AddInternshipPage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('https://www.travelandleisure.com/thmb/JWO4CNVDNSR-aLDBT93jVlHV1DQ=/1800x1200/filters:fill(auto,1)/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg')
    const [signUpDateLimit, setSignUpDateLimit] = useState('')
    const [maxNumberStudents, setMaxNumberStudents] = useState(10000)
    const [minNumberCredits, setMinNumberCredits] = useState(0)
    const [formSent, setFormSent] = useState(false)
    const [error, setError] = useState('')
    const [ImagePickerOpen, setImagePickerOpen] = useState(false)
    const [price, setPrice] = useState(0)

    const { createInternship, getInternships } = useContext(InternshipsContext)

    const handleCreateInternship = async (e) => {
        e.preventDefault()
        setFormSent(true)
        setError(await createInternship({
            name: name,
            description: description,
            img: img,
            price: price,
            signUpDateLimit: signUpDateLimit,
            maxNumberStudents: maxNumberStudents,
            minNumberCredits: minNumberCredits,
        }))
    }

    useEffect(() => {
        getInternships()
    }, [])

    return (
        <form className = 'p-8 sm:pt-12 pt-16 relative' onSubmit = {handleCreateInternship}>
            <ImagePicker visible = {ImagePickerOpen} setVisible = {setImagePickerOpen} imgUrl = {img} setImgUrl = {setImg} />
            <div className = 'font-bold text-xl sm:text-2xl'>
                Adauga un internship
            </div>
            <div className = 'bg-white rounded-xl mt-12 w-full flex overflow-hidden flex-col relative shadow-md'>
                <div>
                    <img src = {img} alt = '' className = 'w-full object-cover h-52' />
                    <div className = 'btn btn-info absolute top-[20px] right-[20px] text-3xl p-2 text-white' onClick = {() => setImagePickerOpen(prev => !prev)}>
                        <ion-icon name="image-outline"></ion-icon>
                    </div>
                </div>
                <div className = 'flex flex-col p-3'>
                    <input className = 'outline-none text-xl lg:text-3xl md:text-2xl p-2' required = "true" value = {name} onChange = {e => setName(e.target.value)} placeholder = "Nume internship"/>
                    <textarea className = ' resize-none outline-none p-2 h-24 text-sm lg:text-base' value = {description} onChange = {e => setDescription(e.target.value)} placeholder = "Descriere internship"/>
                </div>
                <div>
                    
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
                            <NumberInput label = 'Numar maxim elevi' value = {maxNumberStudents} onChange = {val => setMaxNumberStudents(val)} />
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Numar minim credite' value = {minNumberCredits} onChange = {val => setMinNumberCredits(val)}/>
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Pret inscriere' value = {price} onChange = {val => setPrice(val)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'text-center p-2 text-red-500'>
                    {error} 
            </div>
            <div className = 'flex items-center justify-center mt-6'> 

                <button type = 'submit' className = {'text-lg grow max-w-xl btn btn-info text-white font-bold m-2 ' + (formSent && ' loading')} disabled = {formSent && 'true'} >
                    Adauga un internship
                </button>
            </div>
        </form>
    )
}

export default AddInternshipPage
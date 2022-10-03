import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { DatePicker } from '@mantine/dates';
import makeAnimated from 'react-select/animated';
import { ProjectsContext } from '../../../contexts/ProjectsContext';
import { NumberInput } from '@mantine/core';
import ImagePicker from '../../ui-components/modals/ImagePicker';

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

const AddProjectPage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('https://i.pinimg.com/originals/15/81/8f/15818f789d48bdc13ca560aa7d6c8606.jpg')
    const [finalDate, setFinalDate] = useState('')
    const [signUpDateLimit, setSignUpDateLimit] = useState('')
    const [maxNumberStudents, setMaxNumberStudents] = useState(10000)
    const [maxNumberCredits, setMaxNumberCredits] = useState(100)
    const [signUpDependsOn, setSignUpDependsOn] = useState({})
    const [clase, setClase] = useState()
    const [profile, setProfile] = useState()
    const [projectsOptions, setProjectsOptions] = useState([])
    const [formSent, setFormSent] = useState(false)
    const [error, setError] = useState('')
    const [advanced, setAdvanced] = useState(true)
    const [ImagePickerOpen, setImagePickerOpen] = useState(false)
    const [imgOptions, setImageOptions] = useState([
        'https://i.pinimg.com/originals/15/81/8f/15818f789d48bdc13ca560aa7d6c8606.jpg',
        'https://thumbs.dreamstime.com/b/mathematics-round-illustration-vector-math-algebra-symbol-made-thin-line-mathematical-icons-76131896.jpg',
        'https://img.freepik.com/free-vector/online-language-class-illustration_1284-64727.jpg?w=1380&t=st=1664767369~exp=1664767969~hmac=691c0ecad572d824e0f9a52bbd8908d8958c234770e16f7f5a8b4a1ed56ba0e9',
        'https://img.freepik.com/free-vector/tiny-students-with-huge-sign-pi-flat-vector-illustration-boy-girl-studying-math-algebra-school-college-holding-ruler-using-laptop-geometric-figures-background-education-concept_74855-23227.jpg?w=1060&t=st=1664767429~exp=1664768029~hmac=2badf61fae01f41b591a6ca2645d35714ffae65a2a4799d37bb79b8bdf05e2e7',
        'https://img.freepik.com/free-vector/math-science-concept-with-school-lesson-items-retro-cartoon-style_1284-8084.jpg?w=826&t=st=1664767451~exp=1664768051~hmac=f78b281a749a62856bde98ac062c6134d2d70c8e8f8a7eed8099af3f70ddf9b5',
        'https://img.freepik.com/free-vector/geopraphy-concept-with-retro-cartoon-school-lesson-set_1284-7502.jpg?w=826&t=st=1664767512~exp=1664768112~hmac=e77bbeca48bef480cb255d365db0165fec6207223cf104ff193776eb52d099b9',
        'https://img.freepik.com/free-vector/programer-learning-programming-languages-by-computer-laptop-website-tutorial-channel-online-education-class-vector-illustration-software-development-programming-languages-learning_1150-55428.jpg?w=1060&t=st=1664767620~exp=1664768220~hmac=e043860b4b4e501f8a8c75d5402d8c57e9e0ed3981678a86fc91841ec61b6d51',

    ])

    const { allProjects, getAllProjects, createProject } = useContext(ProjectsContext)

    const handleCreateProject = async (e) => {
        e.preventDefault()
        setFormSent(true)
        setError(await createProject({
            name: name,
            description: description,
            img: img,
            finalDate: finalDate,
            signUpDateLimit: signUpDateLimit,
            maxNumberStudents: maxNumberStudents,
            maxNumberCredits: maxNumberCredits,
            signUpDependsOn: signUpDependsOn,
            advanced: advanced,
            clase: clase?.length ? clase : undefined,
            profile: profile?.length ? profile : undefined,
        }))
    }

    useEffect(() => {
        const getOptions = async () => {
            await getAllProjects({
                includeArchived: false,
                clase: [9, 10, 11, 12],
                profile: ["A", "B"]
            })
            console.log(allProjects)
            setProjectsOptions(allProjects.map((project) => {
                return ({
                    label: project?.name,
                    value: project?._id,
                })
            }))
        }
        getOptions() 
    }, [])

    return (
        <form className = 'p-8 sm:pt-12 pt-16 relative' onSubmit = {handleCreateProject}>
            <ImagePicker visible = {ImagePickerOpen} setVisible = {setImagePickerOpen} imgUrl = {img} options = {imgOptions} setImgUrl = {setImg} />
            <div className = 'font-bold text-xl sm:text-2xl'>
                Adauga un proiect
            </div>
            <div className = 'bg-white rounded-xl mt-12 w-full flex overflow-hidden flex-col relative shadow-md'>
                <div>
                    <img src = {img} alt = '' className = 'w-full object-cover h-52' />
                    <div className = 'btn btn-info absolute top-[20px] right-[20px] text-3xl p-2 text-white' onClick = {() => setImagePickerOpen(prev => !prev)}>
                        <ion-icon name="image-outline"></ion-icon>
                    </div>
                </div>
                <div className = 'flex flex-col p-3'>
                    <input className = 'outline-none text-xl lg:text-3xl md:text-2xl p-2' required = "true" value = {name} onChange = {e => setName(e.target.value)} placeholder = "Nume proiect"/>
                    <textarea className = ' resize-none outline-none p-2 h-24 text-sm lg:text-base' value = {description} onChange = {e => setDescription(e.target.value)} placeholder = "Descriere proiect"/>
                    
                    <div className = 'flex p-2'>
                        <input type="checkbox" checked={advanced} onChange = {() => setAdvanced(!advanced)} className="checkbox" /> 
                        <div className = 'pl-2'>
                            Proiectul {!advanced && 'nu ' } este de tip avansat
                        </div>
                    </div>
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
                            <DatePicker placeholder="Pick date" label="Data finala" value = {finalDate} onChange = {e => setFinalDate(e)} />
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Numar maxim elevi' value = {maxNumberStudents} onChange = {val => setMaxNumberStudents(val)} />
                        </div>
                        <div className = 'p-2'>
                            <NumberInput label = 'Numar maxim credite' value = {maxNumberCredits} onChange = {val => setMaxNumberCredits(val)}/>
                        </div>
                        <div className = 'p-2 pt-3'>
                            <div className = 'text-sm'>
                                Clase
                            </div>
                            <Select 
                                options = {claseOptions}
                                onChange = {val => setClase(val.map(val => val.value))}
                                isMulti
                                closeMenuOnSelect = {false}
                            />
                        </div>
                        <div className = 'p-2 pt-3'>
                            <div className = 'text-sm'>
                                Profile
                            </div>
                            <Select 
                                options = {profileOptions}
                                onChange = {val => setProfile(val.map(val => val.value))}
                                isMulti
                                closeMenuOnSelect = {false}
                            />
                        </div>
                        <div className = 'p-2 pt-3'>
                            <div className = 'text-sm'>
                                Inscrierea depinde de participarea la
                            </div>
                            <Select 
                                options = {projectsOptions}
                                isMulti
                                onChange = {val => setSignUpDependsOn(val.map(val => val.value))}
                                closeMenuOnSelect = {false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'text-center p-2 text-red-500'>
                    {error} 
            </div>
            <div className = 'flex items-center justify-center mt-6'> 

                <button type = 'submit' className = {'text-lg grow max-w-xl btn btn-info text-white font-bold m-2 ' + (formSent && ' loading')} disabled = {formSent && 'true'} >
                    Adauga un proiect
                </button>
            </div>
        </form>
    )
}

export default AddProjectPage
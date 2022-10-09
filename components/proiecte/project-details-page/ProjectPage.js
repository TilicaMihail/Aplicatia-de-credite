import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import { NumberInput, Transition } from '@mantine/core';
import { AuthContext } from '../../../contexts/AuthContext';
import Modal from '../../ui-components/modals/Modal';
import Select from 'react-select';
import { UsersContext } from '../../../contexts/UsersContext';
import ImagePicker from '../../ui-components/modals/ImagePicker';
import { DatePicker } from '@mantine/dates';
import { getOptionsFromChildren } from '@mui/base';
import axios from 'axios';
import { apiUrl } from '../../../apiUrl';

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

const ProjectPage = () => {
    const { project, getProjectById, setProject, gradeUser, removeStudent, signUpToProject, updateProject } = useContext(ProjectsContext)
    const { students, getStudents } = useContext(UsersContext)
    const { user } = useContext(AuthContext)
    const [descriptionOpen, setDescriptionOpen] = useState(false)
    const [crediteModalOpen, setCrediteModalOpen] = useState(false)
    const [addCrediteInput, setAddCrediteInput] = useState(0)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [addStudentsModalOpen, setAddStudentsModalOpen] = useState(false)
    const [studentsOptions, setStudentsOptions] = useState([])
    const [studentsToAdd, setStudentsToAdd] = useState([])
    const [addStudentsLoading, setAddStudentsLoading] = useState(false)
    const [settingsModalOpen, setSettingsModalOpen] = useState(false)
    const [imgOptionsModalOpen, setImgOptionsModalOpen] = useState(false)
    const [projectFetched, setProjectFetched] = useState(false)
    const [settingsOptions, setSettingsOptions] = useState({
        name: '',
        description: '',
        signUpDateLimit: '',
        maxNumberCredits: 100,
        maxNumberStudents: 10000,
        clase: claseOptions,
        profile: profileOptions
    })
    const [imgUrl, setImgUrl] = useState('')

    const router = useRouter()
    const { id } = router.query

    const handleAddCredite = () => {
        gradeUser(project?._id, crediteModalOpen, addCrediteInput)
        setCrediteModalOpen(false)
    }

    const handleRemoveStudent = () => {
        removeStudent(project?._id, deleteModalOpen)
        setDeleteModalOpen(false)
    }

    const handleAddStudents = async () => {
        if(addStudentsLoading) return
        setAddStudentsLoading(true)
        for(const i in studentsToAdd) {
            await signUpToProject(project?._id, studentsToAdd[i])
        }
        await getProjectById(router.query.id)
        setAddStudentsModalOpen(false)
        setStudentsToAdd([])
        setAddStudentsLoading(false) 
    }

    const handleSetImgUrl = async (val) => {
        const p = await updateProject(project?._id, { img: val})
        setSettingsOptions(p)
        setProject(p)
        setImgUrl(val)
    }

    const handleUpdateProject = async () => {
        const p = await updateProject(project?._id, settingsOptions)
        setProject(p)
        setSettingsModalOpen(false)
    }

    useEffect(() => {
        setStudentsOptions(students?.map((s) => ({label: s?.firstName + ' ' + s?.lastName + '   ' + s?.clasa + s?.profil, value: s?._id })))
        setSettingsOptions(project)
        if(projectFetched) return

        if(!id) return 
        getProjectById(router.query.id)
        getStudents()
        setProjectFetched(true)
    }, [id, students, project])

    const getPdf = async () => {
        try {
            const response = await axios.get(`${apiUrl}/projects/fisa-prezenta/${project._id}`, { 
                withCredentials: true, 
                responseType: 'arraybuffer',
                headers: {
                'Accept': 'application/pdf'
                }}
            )
            const blob = new Blob([response.data], {type: 'application/pdf'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `fisa-prezenta-${project?.name}.pdf`
            link.click()
        } catch (error) {
            
        }
    }

    return (
        <div className = {'p-8 pt-10'}>
            <ImagePicker visible = {imgOptionsModalOpen} setVisible = {setImgOptionsModalOpen} imgUrl = {imgUrl} setImgUrl = {handleSetImgUrl} />
            {
                project?.advanced === false && project?.author === user?._id && 
                <div className = 'w-full h-20 bg-blue-400 mb-5 rounded-xl flex items-center justify-between p-5'>
                    <div className = 'text-white font-bold text-xl'>
                        Obtine fisa de prezenta
                    </div>
                    <div className = 'border border-white rounded text-white p-2 outline font-bold card-hover' onClick = {getPdf}>
                        Download PDF
                    </div>
                </div>
            }
            <div className = 'w-full '>
                <div className = 'w-full shadow-lg rounded-xl relative'>
                    <img 
                        className = 'w-full h-[280px] rounded-t-xl object-cover'
                        src = { project?.img } 
                        alt = '' 
                    />
                    {(project?.author === user?._id) && 
                        <>
                            <div
                                onClick = {e => setSettingsModalOpen(true)} 
                                className = 'flex items-center justify-center bg-blue-40 p-2 text-3xl rounded-lg absolute top-5 text-white left-5 btn btn-info'
                            >
                                <ion-icon name="settings-sharp"></ion-icon>
                            </div>
                            <div 
                                onClick = {e => setImgOptionsModalOpen(true)}
                                className = 'flex items-center justify-center bg-blue-40 p-2 text-3xl rounded-lg absolute top-5 text-white right-5 btn btn-info'
                            >
                                <ion-icon name="image-outline"></ion-icon>
                            </div>
                        </>
                    }
                    <div className = 'bg-white border-t p-3 rounded-b-xl '>
                        <div className = 'flex w-full items-center justify-between'>
                            <div className = 'lg:text-3xl sm:text-2xl text-xl font-bold'>
                                { project?.name }
                            </div>
                            <div 
                                className = 'text-3xl flex items-center justify-between cursor-pointer hover:scale-125 transition duration-150 ease-in-out'
                                onClick = {e => setDescriptionOpen(prev => !prev)}
                            >
                                <ion-icon name="information-circle-outline"></ion-icon>
                            </div>
                        </div>
                        <Transition mounted = {descriptionOpen} transition="scale-y" duration={400} timingFunction="ease">
                            {(styles) =>
                                <div style={styles}>
                                    { project?.description}
                                </div>
                            }
                        </Transition>
                    </div>
                </div>
                <div className = 'flex justify-between mt-10'>
                    <div className = 'font-bold sm:text-2xl text-xl'>
                        Elevi
                    </div>
                    {
                        (project?.author === user?._id && !(user?.role === 'elev')) &&
                        <div className = 'font-bold sm:text-lg text-white bg-sky-400 sm:p-2 p-1 rounded-lg card-hover' onClick = {e => setAddStudentsModalOpen(true)}>
                            Adauga elevi
                        </div>
                    }
                </div>
                <div className = 'w-full shadow-lg rounded-xl mt-3 bg-white p-3'>
                    <div className = 'flex items-center justify-between border-b'>
                        <div className = 'text-lg font-bold pl-2'>
                            Nume
                        </div>
                        <div className = 'flex items-center gap-4 text-lg font-bold pr-2'>
                            <div className = ''>
                                Credite
                            </div>
                            {
                                project?.author === user?._id && 
                                <div className = ''>
                                    Actiuni
                                </div>
                            }
                        </div>

                    </div>
                    <div>
                        {
                            Object.values(project?.students || {}).length > 0 ? 
                                Object.values(project?.students || {})?.map((student, index) => {
                                    return (
                                        <div className = 'flex items-center justify-between border-b p-2 ' key = {index}>
                                            <div className = 'flex items-center'>
                                                {student?.firstName + " " + student?.lastName}
                                            </div>
                                            <div className = {'flex items-center '}  >
                                                <div className = 'text-lg pr-1' >
                                                    {student?.credite}
                                                </div>
                                                {
                                                    project?.author === user?._id && 
                                                    <>
                                                        <div 
                                                            onClick = {e => { project?.author === user?._id ? setCrediteModalOpen(student?._id)  : setCrediteModalOpen(false)}}
                                                            className = 'flex ml-4 text items-center justify-center text-white bg-sky-400 p-1 rounded mr-2 cursor-pointer card-hover hover:bg-sky-500'
                                                        >
                                                            <ion-icon name="pencil"></ion-icon>
                                                        </div>
                                                        <div
                                                            onClick = {e => { project?.author === user?._id ? setDeleteModalOpen(student?._id)  : setDeleteModalOpen(false)}} 
                                                            className = 'flex text-2xl items-center justify-center text-red-500 pr- cursor-pointer hover:text-red-700'>
                                                            <ion-icon name="trash-sharp"></ion-icon>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            :
                            <div className = 'text-center pt-5 text-lg'>
                                No students yet!
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal visible = {settingsModalOpen} setVisible = {setSettingsModalOpen} >
                <div onClick = {e => e.stopPropagation()} className = 'w-[50%] bg-white rounded-xl shadow-lg p-3 flex flex-col justify-between'>
                    <div className = 'text-2xl font-bold pl-4'>
                        Modifica detaliile proiectului
                    </div>
                    <div className = ''>
                        <div className = 'bg-white rounded-xl w-full flex overflow-hidden flex-col relative'>
                        <div className = 'flex flex-col p-3'>
                            <input className = 'outline-none text-xl p-2' value = {settingsOptions?.name} onChange = {e => setSettingsOptions(p => ({...p, name: e.target.value }))} placeholder = "Nume proiect"/>
                            <textarea className = ' resize-none outline-none p-2 h-10 text-sm lg:text-base' value = {settingsOptions?.description} onChange = {e => setSettingsOptions(p => ({...p, description: e.target.value }))} placeholder = "Descriere proiect"/>
                        </div>
                    </div>
                        <div className = 'bg-white rounded-xl w-full flex flex-col relative'>
                            <div className = 'flex flex-col pl-3 pr-3'>
                                <div>
                                    <div className = 'p-2'>
                                        <DatePicker placeholder="Pick date" label="Limita data inscriere" value = {settingsOptions?.signUpDateLimit} onChange = {e => setSettingsOptions(p => ({...p, signUpDateLimit: e }))} />
                                    </div>
                                    <div className = 'p-2'>
                                        <NumberInput label = 'Numar maxim elevi' value = {settingsOptions?.maxNumberStudents} onChange = {val => setSettingsOptions(p => ({...p, maxNumberStudents: val }))} />
                                    </div>
                                    <div className = 'p-2'>
                                        <NumberInput label = 'Numar maxim credite' value = {settingsOptions?.maxNumberCredits} onChange = {val => setSettingsOptions(p => ({...p, maxNumberCredits: val }))}/>
                                    </div>
                                    <div className = 'p-2 pt-3'>
                                        <div className = 'text-sm'>
                                            Clase
                                        </div>
                                        <Select 
                                            defaultValue = {settingsOptions?.clase?.map(s => ({label: s, value: s}))}
                                            options = {claseOptions}
                                            onChange = {val => setSettingsOptions(p => ({...p, clase: val.map(val => val.value )}))}
                                            isMulti
                                            closeMenuOnSelect = {false}
                                        />
                                    </div>
                                    <div className = 'p-2 pt-3'>
                                        <div className = 'text-sm'>
                                            Profile
                                        </div>
                                        <Select 
                                            defaultValue = {settingsOptions?.profile?.map(s => ({label: s, value: s}))}
                                            options = {profileOptions}
                                            onChange = {val => setSettingsOptions(p => ({...p, profile: val.map(val => val.value )}))}
                                            isMulti
                                            closeMenuOnSelect = {false}
                                        />
                                    </div>
                                    {/* <div className = 'p-2 pt-3'>
                                        <div className = 'text-sm'>
                                            Inscrierea depinde de participarea la
                                        </div>
                                        <Select 
                                            options = {projectsOptions}
                                            isMulti
                                            onChange = {val => setSignUpDependsOn(val.map(val => val.value))}
                                            closeMenuOnSelect = {false}
                                        />
                                    </div> */}
                            </div>
                    </div>
                </div>
                </div>
                    <div className = 'flex gap-2 items-center justify-end pr-4 pt-2'>
                        <div className = {'p-2 bg-red-400 card-hover w-20 text-center rounded text-white font-bold' + (false && ' bg-gray-400')} onClick = {e => {setSettingsModalOpen(false); setSettingsOptions(project)}}>
                            Cancel
                        </div>
                        <div className = {'p-2 bg-sky-400 w-20 text-center card-hover rounded text-white font-bold ' + (false && ' loading btn btn-info')} onClick = {handleUpdateProject}>
                            Ok
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal visible = {addStudentsModalOpen} setVisible = {setAddStudentsModalOpen} >
                <div onClick = {e => e.stopPropagation()} className = 'w-[50%] bg-white rounded-xl shadow-lg p-3 flex flex-col justify-between'>
                    <div className = 'text-2xl font-bold'>
                        Adauga elevi
                    </div>
                    <div className = 'pt-4 pb-6'>
                            <Select 
                                options = {studentsOptions}
                                onChange = {val => setStudentsToAdd(val.map(val => val.value))}
                                isMulti
                            />
                    </div>
                    <div className = 'flex gap-2 items-center justify-end'>
                        <div className = {'p-2 bg-red-400 card-hover w-20 text-center rounded text-white font-bold' + (addStudentsLoading && ' bg-gray-400')} onClick = {e => {if(!addStudentsLoading)setAddStudentsModalOpen(false)}}>
                            Cancel
                        </div>
                        <div className = {'p-2 bg-sky-400 w-20 text-center card-hover rounded text-white font-bold ' + (addStudentsLoading && ' loading btn btn-info')} onClick = {handleAddStudents}>
                            Ok
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal visible = {deleteModalOpen} setVisible = {setDeleteModalOpen} >
                <div onClick = {e => e.stopPropagation()} className = 'w-[50%] h-[130px] bg-white rounded-xl shadow-lg p-3 flex flex-col justify-between'>
                    <div className = 'text-2xl font-bold text-red-400'>
                        Elimina elev
                    </div>
                    <div className = 'flex gap-2 items-center justify-end'>
                        <div className = 'p-2 bg-emerald-400 card-hover w-20 text-center rounded text-white font-bold' onClick = {e => setDeleteModalOpen(false)}>
                            Cancel
                        </div>
                        <div className = 'p-2 bg-red-400 w-20 text-center card-hover rounded text-white font-bold' onClick = {handleRemoveStudent}>
                            Ok
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal visible = {crediteModalOpen} setVisible = {setCrediteModalOpen} >
                <div onClick = {e => e.stopPropagation()} className = 'w-[50%] h-[200px] bg-white rounded-xl shadow-lg p-3 flex flex-col justify-between'>
                    <div className = 'text-2xl font-bold'>
                        Adauga credite
                    </div>
                    <div className = 'flex gap-2 items-center'>
                        <NumberInput 
                            className = 'grow'
                            value = {addCrediteInput} 
                            onChange = {value => setAddCrediteInput(value)} 
                            max = {project?.maxNumberCredits || 100}
                            min={0}
                        />
                        <div className = 'p-2 bg-sky-400 card-hover rounded text-white font-bold' onClick = {handleAddCredite}>
                            Salveaza creditele
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProjectPage
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ProjectsContext } from '../../../contexts/ProjectsContext'
import { NumberInput, Transition } from '@mantine/core';
import { AuthContext } from '../../../contexts/AuthContext';
import Modal from '../../ui-components/modals/Modal';

const ProjectPage = () => {
    const { project, getProjectById, gradeUser } = useContext(ProjectsContext)
    const { user } = useContext(AuthContext)
    const [descriptionOpen, setDescriptionOpen] = useState(false)
    const [crediteModalOpen, setCrediteModalOpen] = useState(false)
    const [addCrediteInput, setAddCrediteInput] = useState(0)
    const router = useRouter()
    const { id } = router.query

    const handleAddCredite = () => {
        console.log(addCrediteInput)
        gradeUser(project?._id, crediteModalOpen, addCrediteInput)
        setCrediteModalOpen(false)
    }

    useEffect(() => {
        if(!id) return 
        getProjectById(router.query.id)
    }, [id])

    console.log(project?.authorName)

    return (
        <div className = {'p-8 pt-10'}>
            {
                project?.advanced === false && project?.author === user?._id && 
                <div className = 'w-full h-20 bg-blue-400 mb-5 rounded-xl flex items-center justify-between p-5'>
                    <div className = 'text-white font-bold text-xl'>
                        Obtine fisa de prezenta
                    </div>
                    <div className = 'border border-white rounded text-white p-2 outline font-bold card-hover'>
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
                        <div className = 'flex items-center justify-center bg-blue-40 p-2 text-3xl rounded-lg absolute top-5 text-white right-5 btn btn-info'>
                            <ion-icon name="settings-sharp"></ion-icon>
                        </div>
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
                        <div className = 'font-bold sm:text-lg text-white bg-sky-400 sm:p-2 p-1 rounded-lg card-hover'>
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
                                                            className = 'flex pl-4 text items-center justify-center text-white bg-sky-400 p-1 rounded mr-2 cursor-pointer card-hover hover:bg-sky-500'
                                                        >
                                                            <ion-icon name="pencil"></ion-icon>
                                                        </div>
                                                        <div className = 'flex text-2xl items-center justify-center text-red-500 pr- cursor-pointer hover:text-red-700'>
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
import { NumberInput, Transition } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { AuthContext } from '../../../contexts/AuthContext'
import { InternshipsContext } from '../../../contexts/InternshipsContext'
import ImagePicker from '../../ui-components/modals/ImagePicker'
import Modal from '../../ui-components/modals/Modal'

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

const InternshipPage = () => {
    const { internship, getInternshipById, setInternship, updateInternship } = useContext(InternshipsContext)
    const { user } = useContext(AuthContext)
    const [descriptionOpen, setDescriptionOpen] = useState(false)
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

    const handleSetImgUrl = async (val) => {
        const p = await updateInternship(internship?._id, { img: val })
        setSettingsOptions(p)
        setInternship(p)
        setImgUrl(val)
    }

    const handleUpdateInternship = async () => {
        const p = await updateInternship(internship?._id, settingsOptions)
        setInternship(p)
        setSettingsModalOpen(false)
    }

    useEffect(() => {
        setSettingsOptions(internship)
        if(projectFetched) return
        if(!id) return 
        getInternshipById(router.query.id)
        setProjectFetched(true)
    }, [id, internship])

    return (
        <div className = {'p-8 pt-10'}>
            <ImagePicker visible = {imgOptionsModalOpen} setVisible = {setImgOptionsModalOpen} imgUrl = {imgUrl} setImgUrl = {handleSetImgUrl} />
            <div className = 'w-full '>
                <div className = 'w-full shadow-lg rounded-xl relative'>
                    <img 
                        className = 'w-full h-[280px] rounded-t-xl object-cover'
                        src = { internship?.img } 
                        alt = '' 
                    />
                    {(internship?.author === user?._id) && 
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
                                { internship?.name }
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
                                    { internship?.description}
                                </div>
                            }
                        </Transition>
                    </div>
                </div>
                <div className = 'flex justify-between mt-10'>
                    <div className = 'font-bold sm:text-2xl text-xl'>
                        Elevi
                    </div>
                </div>
                <div className = 'w-full shadow-lg rounded-xl mt-3 bg-white p-3'>
                    <div className = 'border-t'>
                        {
                            Object.values(internship?.students || {}).length > 0 ? 
                                Object.values(internship?.students || {})?.map((student, index) => {
                                    return (
                                        <div className = 'flex items-center justify-between border-b p-2 ' key = {index}>
                                            <div className = {'flex items-center' + (index < internship?.maxNumberStudents && ' font-bold')}>
                                                {index + 1}. {student?.firstName + " " + student?.lastName}
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
                        Modifica detaliile internship-ului
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
                                        <NumberInput label = 'Numar minim credite' value = {settingsOptions?.minNumberCredits} onChange = {val => setSettingsOptions(p => ({...p, minNumberCredits: val }))}/>
                                    </div>
                                    <div className = 'p-2'>
                                        <NumberInput label = 'Pret' value = {settingsOptions?.price} onChange = {val => setSettingsOptions(p => ({...p, price: val }))}/>
                                    </div>
                            </div>
                    </div>
                </div>
                </div>
                    <div className = 'flex gap-2 items-center justify-end pr-4 pt-2'>
                        <div className = {'p-2 bg-red-400 card-hover w-20 text-center rounded text-white font-bold' + (false && ' bg-gray-400')} onClick = {e => {setSettingsModalOpen(false); setSettingsOptions(project)}}>
                            Cancel
                        </div>
                        <div className = {'p-2 bg-sky-400 w-20 text-center card-hover rounded text-white font-bold ' + (false && ' loading btn btn-info')} onClick = {handleUpdateInternship}>
                            Ok
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default InternshipPage
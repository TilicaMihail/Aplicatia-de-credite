import React, { useState } from 'react'
import { Transition } from '@mantine/core';

const ImagePicker = ({ setImgUrl, imgUrl, visible, setVisible }) => {
    const [customUrl, setCustomUrl] = useState('')
    const [error, setError] = useState('')

    const [options, setImageOptions] = useState([
        'https://i.pinimg.com/originals/15/81/8f/15818f789d48bdc13ca560aa7d6c8606.jpg',
        'https://media.istockphoto.com/vectors/people-learning-english-isometric-vector-illustration-distance-vector-id1214244642?k=20&m=1214244642&s=612x612&w=0&h=9xnN0QiEaJWRkL6NGHkirlD0qyWHjuxZMooW0xOZwm4=',
        'https://assets.entrepreneur.com/content/3x2/2000/20150115183825-books-reading.jpeg?auto=webp&quality=95&crop=16:9&width=675',
        'https://t3.ftcdn.net/jpg/03/11/56/20/360_F_311562094_O7mJHicgE5V9J2lefzBy43OJJNpn0B8E.jpg',
        'https://img.freepik.com/free-vector/brain-cartoon-icon-illustration-education-object-icon-concept_138676-2578.jpg?size=338&ext=jpg&ga=GA1.2.1895937995.1665222507',
        'https://www.jobtestprep.co.uk/media/31785/numerical-reasoning-test-formulas.jpg',
        'https://content.presspage.com/uploads/2170/1920_gettyimages-1181559937.jpg?10000',
        'https://media1.thehungryjpeg.com/thumbs2/ori_3631581_4xqfoqi8xmyp1v8sn5gmvmk2f0w1jbuit3pldfnc_doodle-math-blackboard-mathematical-theory-formulas-and-equations-ha.jpg',
        'https://static.vecteezy.com/system/resources/previews/003/297/662/original/physics-concept-with-icon-set-with-big-word-free-vector.jpg',
        'https://www.thejoannabrowntrust.org/wp-content/uploads/2021/02/cropped-AdobeStock_293331958-scaled-1.jpeg',
        'https://img.freepik.com/free-vector/gym-concept-illustration_114360-6550.jpg?w=2000',
        'https://cdni.iconscout.com/illustration/premium/thumb/couple-doing-exercise-in-the-gym-2511564-2117903.png',
        'https://www.holbeachprimaryacademy.co.uk/_images/1085509_l.jpg',
    ])

    return (
        <Transition mounted = {visible} transition="scale-y" duration={400} timingFunction="ease">
            {(styles) =>
                    <div style={styles} className = 'absolute top-0 left-0 z-10 h-screen w-full flex items-center justify-center bg-gray-100/10' onClick = {() => setVisible(false)}>
                        <div className = 'bg-white p-6 shadow-lg border rounded-xl w-4/6 ' onClick = {e => {e.stopPropagation()}}>
                            <div className = 'text-center text-lg font-bold border-b pb-3'>
                                Alege o imagine 
                            </div>
                            <div className = 'h-[400px] overflow-auto flex flex-wrap pt-3'>
                                {
                                    options?.map((item, index) => {
                                        return (
                                            <div key = {index} onClick = {e => {e.stopPropagation(); setImgUrl(item)}}>
                                                <img src={item} alt = '' className = {'w-52 h-52 object-cover cursor-pointer m-2 rounded-xl overflow-hidden' + (imgUrl === item && ' border-blue-500 border shadow-lg')} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className = 'flex items-center justify-center mt-2'>
                                <input className = 'border outline-none grow p-3 m-1 rounded-xl' value = {customUrl} onChange = {e => {setCustomUrl(e.target.value); setError('')}} placeholder = 'Enter image address' />
                                <div className = 'btn btn-info text-white' onClick = {() => {customUrl !== '' ? setImageOptions(prev => [...prev, customUrl]) : setError('Custom url input is empty')}}>
                                    Add custom image
                                </div>
                            </div>
                            <div className = 'text-center p-1 text-red-500 font-bold'>
                                {error}
                            </div>
                        </div>
                    </div>
            }
        </Transition>
    )
}

export default ImagePicker
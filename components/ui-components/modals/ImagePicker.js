import React, { useState } from 'react'
import { Transition } from '@mantine/core';

const ImagePicker = ({ setImgUrl, imgUrl, visible, setVisible }) => {
    

    const [options, setImageOptions] = useState([
        'https://i.pinimg.com/originals/15/81/8f/15818f789d48bdc13ca560aa7d6c8606.jpg',
        'https://thumbs.dreamstime.com/b/mathematics-round-illustration-vector-math-algebra-symbol-made-thin-line-mathematical-icons-76131896.jpg',
        'https://img.freepik.com/free-vector/online-language-class-illustration_1284-64727.jpg?w=1380&t=st=1664767369~exp=1664767969~hmac=691c0ecad572d824e0f9a52bbd8908d8958c234770e16f7f5a8b4a1ed56ba0e9',
        'https://img.freepik.com/free-vector/tiny-students-with-huge-sign-pi-flat-vector-illustration-boy-girl-studying-math-algebra-school-college-holding-ruler-using-laptop-geometric-figures-background-education-concept_74855-23227.jpg?w=1060&t=st=1664767429~exp=1664768029~hmac=2badf61fae01f41b591a6ca2645d35714ffae65a2a4799d37bb79b8bdf05e2e7',
        'https://img.freepik.com/free-vector/math-science-concept-with-school-lesson-items-retro-cartoon-style_1284-8084.jpg?w=826&t=st=1664767451~exp=1664768051~hmac=f78b281a749a62856bde98ac062c6134d2d70c8e8f8a7eed8099af3f70ddf9b5',
        'https://img.freepik.com/free-vector/geopraphy-concept-with-retro-cartoon-school-lesson-set_1284-7502.jpg?w=826&t=st=1664767512~exp=1664768112~hmac=e77bbeca48bef480cb255d365db0165fec6207223cf104ff193776eb52d099b9',
        'https://img.freepik.com/free-vector/programer-learning-programming-languages-by-computer-laptop-website-tutorial-channel-online-education-class-vector-illustration-software-development-programming-languages-learning_1150-55428.jpg?w=1060&t=st=1664767620~exp=1664768220~hmac=e043860b4b4e501f8a8c75d5402d8c57e9e0ed3981678a86fc91841ec61b6d51',

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
                                                <img src={item} alt = '' className = {'w-52 h-52 object-cover m-2 rounded-xl overflow-hidden' + (imgUrl === item && ' border-blue-500 border shadow-lg')} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <div className = 'btn btn-info text-white w-full mt-6 m-auto'>
                                Alege imaginea
                            </div> */}
                        </div>
                    </div>
            }
        </Transition>
    )
}

export default ImagePicker
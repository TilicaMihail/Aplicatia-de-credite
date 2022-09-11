import React from 'react'

const ImagePicker = ({ setImgUrl, imgUrl, visible, setVisible, options }) => {
    

    if(!visible) return 

    return (
        <div className = 'absolute top-0 left-0 z-10 h-screen w-full flex items-center justify-center bg-gray-100/10' onClick = {() => setVisible(false)}>
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
    )
}

export default ImagePicker
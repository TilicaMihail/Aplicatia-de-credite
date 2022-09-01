import React, { useState } from 'react'

const Tabs = ({ tabs }) => {
    const [selected, setSelected] = useState(0)
    return (
        <div>
            <div className = 'flex pl-2'>
                {
                    tabs.map((tab, index) => {
                        return (
                            <div 
                                key = {index} 
                                className = {'text-lg cursor-pointer hover:bg-gray-200 rounded-t-lg border-b-4 p-2 ' + (index === 0 && ' pl-0 ') + (selected === index ? ' font-bold border-black' : ' border-gray-100 ')} 
                                onClick = {() => { setSelected(index)}}
                            >
                                {tab.label}
                            </div>
                        )
                    })
                }
                
            </div>
            <div className = 'p-2 pt-6'>
                {
                    tabs[selected].component
                }
            </div>
        </div>
    )
}

export default Tabs
import React, { useState } from 'react'

const Tabs = ({ tabs }) => {
    const [selected, setSelected] = useState(0)
    return (
        <div>
            <div className = 'flex'>
                {
                    tabs.map((tab, index) => {
                        return (
                            <div 
                                key = {index} 
                                className = {'p-2 text-lg cursor-pointer hover:bg-gray-200 rounded-t-lg border-b-4 ' + (selected === index ? ' font-bold border-blue-400' : 'border-gray-100 ')} 
                                onClick = {() => { setSelected(index)}}
                            >
                                {tab.label}
                            </div>
                        )
                    })
                }
                
            </div>
            <div className = 'p-2'>
                {
                    tabs[selected].component
                }
            </div>
        </div>
    )
}

export default Tabs
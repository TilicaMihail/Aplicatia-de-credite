import React from 'react'

const Tabs = ({ tabs }) => {
    return (
        <div>
            {
                tabs.map((tab, index) => {
                    return (
                        <div key = {index}>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tabs
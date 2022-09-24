import React from 'react'
import { Transition } from '@mantine/core';

const Modal = ({ visible, setVisible, children }) => {
    return (
        <Transition mounted = {visible} transition="scale-y" duration={400} timingFunction="ease">
            {(styles) =>
                    <div style={styles} className = 'fixed top-0 left-0 z-10 h-screen w-full flex items-center justify-center bg-gray-100/10' onClick = {() => setVisible(false)}>
                        { children }
                    </div>
            }
        </Transition>
    )
}

export default Modal
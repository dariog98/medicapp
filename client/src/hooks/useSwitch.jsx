import { useState } from 'react'

const useSwitch = () => {
    const [mode, setMode] = useState(false)

    const toggleSwitch = () => {
        setMode(m => !m)
    }

    const onSwitch = () => {
        setMode(true)
    }

    const offSwitch = () => {
        setMode(false)
    }

    return {
        mode,
        toggleSwitch,
        onSwitch,
        offSwitch,
    }
}

export default useSwitch
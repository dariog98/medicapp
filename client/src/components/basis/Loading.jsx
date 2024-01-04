import { useSettingsContext } from '../providers/SettingsProvider'

const SIZE = {
    small: { width: '2rem', height: '2rem', borderWidth: '0.2rem' },
    large: { width: '3.5rem', height: '3.5rem', borderWidth: '0.4rem' },
}

const Loading = ({ size }) =>{
    const { language } = useSettingsContext()

    return (
        <div className='flex-grow-1 d-flex flex-column gap-3 justify-content-center align-items-center'>
            <div className='spinner-border' style={SIZE[size] ?? SIZE.large}></div>
            <div>{language.messages.Loading}</div>
        </div>
    )
}

export default Loading

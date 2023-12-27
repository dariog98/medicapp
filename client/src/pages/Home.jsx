import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Title } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'

const Home = () => {
    const { language } = useSettingsContext()

    return (
        <div className='w-100 my-4'>
            <div className='container'>
                <div className='d-flex flex-column gap-3'>
                    <Title icon={faHouse} text={language.Home}/>
                </div>
            </div>
        </div>
    )
}

export default Home
import { Button, Title } from '../components/basis'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import Main from '../components/configuration/Main'
import { useSearchParams } from 'react-router-dom'
import Profile from '../components/configuration/Profile'

const TABS = {
    Main: 'main',
    Profile: 'profile'
}

const Configuration = () => {
    const { language } = useSettingsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentTab = searchParams.get('tab') ?? 'main'

    const handleTab = (value) => {
        setSearchParams(params => {
            params.set('tab', value)
            return params
        })
    }

    return (
        <div className='w-100 my-4'>
            <div className='container'>
                <div className='d-flex flex-column gap-3 ps-5 vh-100'>
                    <Title icon={faSliders} text={language.Configuration}/>

                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column nav-vertical' style={{ width: '150px'}}>
                            <Button
                                className={currentTab === TABS.Main ? 'active' : ''}
                                text={language.Main}
                                handleOnClick={() => handleTab(TABS.Main)}
                            />

                            <Button
                                className={currentTab === TABS.Profile ? 'active' : ''}
                                text={language.Profile}
                                handleOnClick={() => handleTab(TABS.Profile)}
                            />
                        </div>

                        <div className='d-flex flex-column gap-3 flex-grow-1 ps-3'>
                            {
                                currentTab === TABS.Main &&
                                <Main/>
                            }
                            {
                                currentTab === TABS.Profile &&
                                <Profile/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configuration
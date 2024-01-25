import { Button, Container, Title } from '../components/basis'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useSearchParams } from 'react-router-dom'
import { Main, Profile } from '../components/configuration'
import { CONF_TABS } from '../constants/configurations'

const TABS = {
    [CONF_TABS.Main]: Main,
    [CONF_TABS.Profile]: Profile,
}

const Configuration = () => {
    const { language } = useSettingsContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentTab = searchParams.get('tab') ?? CONF_TABS.Main
    const Tab = TABS[currentTab]

    const handleTab = (value) => {
        setSearchParams(params => {
            params.set('tab', value)
            return params
        })
    }

    return (
        <Container>
            <div className='d-flex flex-column gap-3 vh-100'>
                <Title icon={faSliders} text={language.Configuration}/>

                <div className='d-flex flex-row'>
                    <div className='d-flex flex-column nav-vertical' style={{ width: '150px'}}>
                        <Button
                            className={currentTab === CONF_TABS.Main ? 'active' : ''}
                            text={language.Main}
                            handleOnClick={() => handleTab(CONF_TABS.Main)}
                        />

                        <Button
                            className={currentTab === CONF_TABS.Profile ? 'active' : ''}
                            text={language.Profile}
                            handleOnClick={() => handleTab(CONF_TABS.Profile)}
                        />
                    </div>

                    <div className='d-flex flex-column gap-3 flex-grow-1 ps-3'>
                        <Tab/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Configuration
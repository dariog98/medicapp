import { faCog } from '@fortawesome/free-solid-svg-icons'
import { LANGUAGES } from '../../constants/languages'
import { Select, Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const Main = () => {
    const { language, currentLanguage, handleLanguage, toggleTheme, isThemeDark } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faCog} text={language.Main}/>

            <Select
                label={language.configuration.Language}
                options={Object.keys(LANGUAGES).map(key => ({value: key, label: key}))}
                defaultValue={currentLanguage}
                handleOnChange={({ target }) => handleLanguage(target.value)}
            />

            <div className='form-check form-switch'>
                <label className='form-check-label'>{language.configuration.DarkMode}</label>
                <input className='form-check-input' type='checkbox' checked={isThemeDark} onChange={toggleTheme}/>
            </div>
        </div>
    )
}

export default Main
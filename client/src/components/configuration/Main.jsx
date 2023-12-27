import { faCog } from '@fortawesome/free-solid-svg-icons'
import { LANGUAGES } from '../../constants/languages'
import { Title } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const Main = () => {
    const { language, currentLanguage, handleLanguage, toggleTheme, isThemeDark } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            <Title icon={faCog} text={language.Main}/>

            <div>
                <label className='form-label'>{language.configuration.Language}</label>
                <select className='form-select' defaultValue={currentLanguage} onChange={({ target }) => handleLanguage(target.value)}>
                    {
                        Object.keys(LANGUAGES).map(key =>
                            <option key={key} value={key}>{key}</option>
                        )
                    }
                </select>
            </div>

            <div className='form-check form-switch'>
                <label className='form-check-label'>{language.configuration.DarkMode}</label>
                <input className='form-check-input' type='checkbox' checked={isThemeDark} onChange={toggleTheme}/>
            </div>
        </div>
    )
}

export default Main
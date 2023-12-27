import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserDoctor, faCalendarDays, faHouse, faSliders } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useLocation } from 'react-router-dom'
import { useSettingsContext } from '../providers/SettingsProvider'

const Button = ({ icon, route, title }) => {
    const location = useLocation()
    const isActived = location.pathname === route
    return (
        <Link
            to={route}
            className={`btn rounded-4 d-flex justify-content-center align-items-center ${isActived ? 'btn-primary active' : 'btn-outline-system' }`}
            style={{ width: '64px', height: '64px' }}
            title={title}
        >
            <FontAwesomeIcon icon={icon} size='2x'/>
        </Link>
    )
}

const Sidebar = () => {
    const { language } = useSettingsContext()

    return (
        <div className='vh-100 border-end'>
            <div className='d-flex flex-column gap-3 px-3 py-4'>
                <Button route={ROUTES.Home} title={language.Home} icon={faHouse}/>
                <Button route={ROUTES.Patients} title={language.Patients} icon={faUsers}/>
                <Button route={ROUTES.Profesionals} title={language.Profesionals} icon={faUserDoctor}/>
                <Button icon={faCalendarDays}/>
                <Button route={ROUTES.Configuration} title={language.Configuration} icon={faSliders}/>
            </div>
        </div>
    )
}

export default Sidebar
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../providers/UserProvider'
import { ROUTES } from '../../constants/routes'

const ProtectedUserRoute = () => {
    const { user } = useUserContext()

    if (!user) return <Navigate to={ROUTES.Login} replace/>

    return <Outlet/>
}

export default ProtectedUserRoute
  
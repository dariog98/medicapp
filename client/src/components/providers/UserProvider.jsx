import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { USER_ROLES } from '../../constants/roles'

const userContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const { setItem, getItem, removeItem } = useLocalStorage('USER')
    const userToken = user?.accessToken
    const isAdmin = user?.role.id === USER_ROLES.Admin

    const handleLogIn = (user) => {
        setUser(user)
        setItem(user)
    }

    const handleLogOut = () => {
        removeItem()
        setUser(undefined)
    }

    const storagedUser = getItem()

    if (!user && storagedUser) {
        try {
            setUser(storagedUser)
        } catch (error) {
            //Do nothing
        }
    }

    const userController = { user, handleLogIn, handleLogOut, userToken, isAdmin }
    
    return (
        <userContext.Provider value={userController}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext }
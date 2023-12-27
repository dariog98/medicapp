import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../../hooks'

const userContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const { setItem, getItem, removeItem } = useLocalStorage('USER')
    const userToken = user?.accessToken

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

    return (
        <userContext.Provider value={{ user, handleLogIn, handleLogOut, userToken }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext }
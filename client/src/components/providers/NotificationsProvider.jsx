import { createContext, useContext, useState } from 'react'
import { Notification } from '../basis'

const notificationsContext = createContext()

const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const deleteNotification = (idNotification) => {
        setNotifications(n => n.filter(notif => notif.id !== idNotification))
    }

    const addNotification = (notification) => {
        setNotifications(n => [...n, notification])
        if (notification.time) setTimeout(() => deleteNotification(notification.id), notification.time)
    }

    return (
        <notificationsContext.Provider value={{ notifications, addNotification }}>
            {children}
            <div className='toast-container position-fixed bottom-0 end-0 p-3'>
                {
                    notifications.map((notification) =>
                        <Notification
                            key={notification.id}
                            data={notification}
                            handleClose={() => deleteNotification(notification.id)}
                        />
                    )
                }
            </div>
        </notificationsContext.Provider>
    )
}

const useNotificationsContext = () => {
    return useContext(notificationsContext)
}

export { NotificationsProvider, useNotificationsContext }
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './bootstrap.css'
import './styles.css'
import { UserProvider } from './components/providers/UserProvider'
import { SettingsProvider } from './components/providers/SettingsProvider'
import { NotificationsProvider } from './components/providers/NotificationsProvider'

const root = createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <UserProvider>
            <SettingsProvider>
                <NotificationsProvider>
                    <App/>
                </NotificationsProvider>
            </SettingsProvider>
        </UserProvider>
    </React.StrictMode>
)
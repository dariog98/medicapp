import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { TIMEZONES } from '../../constants/time'
import { LANGUAGES } from '../../constants/languages'

const settingsContext = createContext()

const SettingsProvider = ({ children }) => {
    const themeStorage = useLocalStorage('THEME')
    const timeZoneStorage = useLocalStorage('TIMEZONE')
    const languageStorage = useLocalStorage('LANGUAGE')

    const [language, setLanguage] = useState(languageStorage.getItem() || 'EN')
    const [theme, setTheme] = useState(themeStorage.getItem() || 'light')
    const [showTurns, setShowTurns] = useState(true)
    const [showExceptions, setShowExceptions] = useState(true)
    const [timeZone, setTimeZone] = useState(TIMEZONES[timeZoneStorage.getItem() || 0])
    const [format24, setFormat24] = useState(false)

    document.body.setAttribute('data-bs-theme', theme)

    const isThemeDark = theme === 'dark'

    const toggleTheme = () => {
        setTheme(isThemeDark ? 'light' : 'dark')
        themeStorage.setItem(isThemeDark ? 'light' : 'dark')
    }

    const toggleFormat = () => {
        const value = !format24
        setFormat24(value)
    }

    const toggleShowTurns = () => {
        setShowTurns(show => !show)
    }

    const toggleShowExceptions = () => {
        setShowExceptions(show => !show)
    }

    const handleLanguage = (value) => {
        setLanguage(value)
        languageStorage.setItem(value)
    }

    const config = {
        currentLanguage: language,
        language: LANGUAGES[language],
        handleLanguage,
        theme,
        toggleTheme,
        isThemeDark,
        timeZone,
        handleTimeZone: setTimeZone,
        format24,
        toggleFormat,
        showTurns,
        showExceptions,
        toggleShowTurns,
        toggleShowExceptions,
    }

    return (
        <settingsContext.Provider value={config}>
            {children}
        </settingsContext.Provider>
    )
}

const useSettingsContext = () => {
    return useContext(settingsContext)
}

export { SettingsProvider, useSettingsContext }
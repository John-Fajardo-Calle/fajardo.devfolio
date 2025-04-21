import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(
        localStorage.theme === 'dark' ? 'dark' : 'light'
    )

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.theme = theme
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

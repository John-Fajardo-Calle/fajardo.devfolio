import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const accessibleLabel = theme === 'light' ? t('theme.toggleDark', 'Cambiar a modo oscuro') : t('theme.toggleLight', 'Cambiar a modo claro');

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100
                       dark:focus:ring-offset-gray-800 focus:ring-blue-500
                       transition-colors duration-300
                       hover:[background-image:radial-gradient(ellipse_at_center,white0%,theme(colors.gray.100)50%,theme(colors.gray.200)100%)]
                       dark:hover:[background-image:radial-gradient(ellipse_at_center,theme(colors.gray.600)0%,theme(colors.gray.700)50%,theme(colors.gray.800)100%)]"
            aria-label={accessibleLabel}
        >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
    );
};

export default ThemeToggle;
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language;

    let targetLangCode, buttonTextDisplay;

    if (currentLang === 'es') {
        targetLangCode = 'en';
        buttonTextDisplay = 'EN';
    } else {
        targetLangCode = 'es';
        buttonTextDisplay = 'ES';
    }

    const handleChangeLanguage = () => {
        i18n.changeLanguage(targetLangCode);
    };

    const targetLangName = targetLangCode === 'es'
        ? t('language.es', 'Español')
        : t('language.en', 'Inglés');

    const accessibleLabel = t('language.switchTo', 'Cambiar a {{lng}}', { lng: targetLangName });

    return (
        <button
            onClick={handleChangeLanguage}
            className={`
        px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
        border-2 bg-transparent 
        text-gray-700 dark:text-gray-300 
        border-gray-300 dark:border-gray-600 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        hover:border-gray-400 dark:hover:border-gray-500
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 
        focus:ring-blue-500
      `}
            aria-label={accessibleLabel}
            title={accessibleLabel}
        >
            {buttonTextDisplay}
        </button>
    );
};

export default LanguageSwitcher;
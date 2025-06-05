import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 shadow-inner transition-colors duration-300">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm mb-1">
                    {t('footer.madeWith', 'Hecho con React, TailwindCSS y ❤️ por John Fajardo.')}
                </p>
                <p className="text-sm">
                    &copy; {currentYear} John Fajardo. {t('footer.rightsReserved', 'Todos los derechos reservados.')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import getAssetUrl from '../utils/getAssetUrl';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinksData = [
        { to: '/', textKey: 'navbar.home', defaultText: 'Inicio' },
        { to: '/cv', textKey: 'navbar.cv', defaultText: 'CV' },
        { to: '/projects', textKey: 'navbar.projects', defaultText: 'Proyectos' },
        { to: '/about', textKey: 'navbar.about', defaultText: 'Acerca de Mí' },
        { to: '/contact', textKey: 'navbar.contact', defaultText: 'Contacto' },
    ];

    const logoSrc = getAssetUrl('fajardo.devfolio_copia.ico');


    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center" aria-label="Página de inicio">
                            <img
                                src={logoSrc}
                                alt={t('navbar.logoAlt', 'Logo de fajardo.devfolio')}
                                style={{ height: '55px', width: 'auto' }}
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
                        {navLinksData.map((linkInfo) => (
                            <NavLink
                                key={linkInfo.to}
                                to={linkInfo.to}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                                        isActive
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                {t(linkInfo.textKey, linkInfo.defaultText)}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                        <div className="md:hidden flex items-center ml-4">
                            <motion.button
                            onClick={toggleMobileMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                                aria-label={t('navbar.toggleMobileMenu', 'Alternar menú móvil')}
                                animate={isMobile ? { rotate: isMobileMenuOpen ? 90 : 0 } : false}
                                transition={isMobile ? { duration: 0.2 } : undefined}
                            >
                                <span className="sr-only">{t('navbar.openMenu', 'Abrir menú principal')}</span>
                                {isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobile && (
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-gray-200 dark:border-gray-700" id="mobile-menu"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navLinksData.map((linkInfo) => (
                                    <NavLink
                                    key={linkInfo.to}
                                    to={linkInfo.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                            isActive
                                                ? 'bg-blue-600 text-white dark:bg-blue-500'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                {t(linkInfo.textKey, linkInfo.defaultText)}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-around px-5">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </nav>
    );
};

export default Navbar;
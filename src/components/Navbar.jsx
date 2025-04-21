// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    // Escuchar cambios de tamaño para recalcular isMobile
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (!mobile) setOpen(false) // cerrar menú móvil al pasar a desktop
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <nav className="fixed top-0 w-full bg-white/60 dark:bg-[#1A2238]/60 backdrop-blur-md z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link to="/" className="font-heading text-xl">
                    fajardo.devfolio
                </Link>

                {/* Si no es mobile muestra el menú horizontal */}
                {!isMobile ? (
                    <ul className="flex space-x-8 font-sub list-none">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/projects">Proyectos</Link></li>
                        <li><Link to="/cv">CV</Link></li>
                        <li><Link to="/about">Sobre mí</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                ) : (
                    <>
                        {/* Botón hamburguesa */}
                        <button
                            onClick={() => setOpen(o => !o)}
                            aria-label="Menú móvil"
                            className="flex flex-col items-center justify-center w-8 h-8 focus:outline-none"
                        >
              <span
                  className={`block w-6 h-0.5 bg-current mb-1 transition-transform ${
                      open ? 'rotate-45 translate-y-1' : ''
                  }`}
              />
                            <span
                                className={`block w-6 h-0.5 bg-current mb-1 transition-opacity ${
                                    open ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-current transition-transform ${
                                    open ? '-rotate-45 -translate-y-1' : ''
                                }`}
                            />
                        </button>

                        {/* Drawer móvil */}
                        {open && (
                            <ul className="absolute top-full left-0 w-full bg-white dark:bg-[#1A2238] border-t border-gray-200 dark:border-gray-700 list-none">
                                <li className="py-2"><Link to="/" onClick={() => setOpen(false)}>Inicio</Link></li>
                                <li className="py-2"><Link to="/projects" onClick={() => setOpen(false)}>Proyectos</Link></li>
                                <li className="py-2"><Link to="/cv" onClick={() => setOpen(false)}>CV</Link></li>
                                <li className="py-2"><Link to="/about" onClick={() => setOpen(false)}>Sobre mí</Link></li>
                                <li className="py-2"><Link to="/contact" onClick={() => setOpen(false)}>Contacto</Link></li>
                            </ul>
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}

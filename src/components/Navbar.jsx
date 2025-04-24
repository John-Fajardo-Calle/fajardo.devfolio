import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)

    // Evita el scroll del body cuando el drawer está abierto
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', open)
    }, [open])

    const links = [
        { to: '/', label: 'Inicio' },
        { to: '/projects', label: 'Proyectos' },
        { to: '/cv', label: 'CV' },
        { to: '/about', label: 'Sobre mí' },
        { to: '/contact', label: 'Contacto' },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#1A2238]/70 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <Link to="/" className="font-heading text-xl">
                    fajardo.devfolio
                </Link>

                {/* Menú escritorio */}
                <ul className="hidden md:flex gap-8 font-sub list-none">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className="hover:text-accentTeal dark:hover:text-accentTealLight transition"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburguesa */}
                <button
                    onClick={toggle}
                    aria-label="Menú móvil"
                    className="md:hidden flex flex-col items-center justify-center w-8 h-8"
                >
          <span
              className={`block w-6 h-0.5 bg-current transition-transform ${
                  open ? 'rotate-45 translate-y-[5px]' : ''
              }`}
          />
                    <span
                        className={`block w-6 h-0.5 bg-current my-[3px] transition-opacity ${
                            open ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-current transition-transform ${
                            open ? '-rotate-45 -translate-y-[5px]' : ''
                        }`}
                    />
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={toggle}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
                />
            )}

            {/* Drawer móvil */}
            <aside
                className={`
          fixed top-0 right-0 h-full w-64 md:hidden
          bg-white dark:bg-[#1A2238] shadow-lg
          transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                <ul className="mt-20 flex flex-col gap-6 font-sub px-6 list-none marker:none">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} onClick={toggle} className="text-lg block">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </nav>
    )
}
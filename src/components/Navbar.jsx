import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/cv', label: 'CV' },
    { to: '/about', label: 'Sobre mí' },
    { to: '/contact', label: 'Contacto' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const toggle = () => setOpen(!open)

    /* Bloquea el scroll cuando el drawer móvil está abierto */
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', open)
    }, [open])

    /* Estilos comunes de los enlaces */
    const linkClass =
        'block font-sub hover:text-accentTeal dark:hover:text-accentTealLight transition'

    /* ————————— RENDER ————————— */
    return (
        <>
            {/* ░░░ Barra superior SOLO móvil ░░░ */}
            <header className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between h-16 px-4 bg-white/80 dark:bg-[#1A2238]/80 backdrop-blur-md shadow">
                <Link to="/" className="font-heading text-xl" onClick={() => setOpen(false)}>
                    fajardo.devfolio
                </Link>

                {/* Hamburguesa */}
                <button
                    onClick={toggle}
                    aria-label="Menú móvil"
                    className="flex flex-col items-center justify-center w-8 h-8"
                >
          <span
              className={`w-6 h-0.5 bg-current transition-transform ${
                  open ? 'rotate-45 translate-y-[5px]' : ''
              }`}
          />
                    <span
                        className={`w-6 h-0.5 bg-current my-[3px] transition-opacity ${
                            open ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-current transition-transform ${
                            open ? '-rotate-45 -translate-y-[5px]' : ''
                        }`}
                    />
                </button>
            </header>

            {/* ░░░ Sidebar fijo SOLO escritorio ░░░ */}
            <aside
                className="
          hidden md:flex fixed top-0 left-0 z-40 h-full w-60
          flex-col bg-white dark:bg-[#1A2238] shadow-lg
        "
            >
                <div className="h-16 flex items-center justify-center font-heading text-xl border-b border-black/10 dark:border-white/10">
                    fajardo.devfolio
                </div>

                <ul className="flex-1 flex flex-col gap-4 px-6 py-8 list-none">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={
                                    linkClass +
                                    (location.pathname === to
                                        ? ' text-accentTeal dark:text-accentTealLight'
                                        : '')
                                }
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* ░░░ Drawer móvil ░░░ */}
            {/* Overlay */}
            {open && (
                <div
                    onClick={toggle}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
                />
            )}

            {/* Drawer panel */}
            <nav
                className={`
          fixed top-0 right-0 h-full w-64 md:hidden z-50
          bg-white dark:bg-[#1A2238] shadow-lg
          transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                <ul className="mt-20 flex flex-col gap-6 px-6 list-none marker:none">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} onClick={toggle} className={linkClass + ' text-lg'}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
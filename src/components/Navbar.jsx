import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { to: '/', label: 'Inicio' },
        { to: '/projects', label: 'Proyectos' },
        { to: '/cv', label: 'CV' },
        { to: '/about', label: 'Sobre mí' },
        { to: '/contact', label: 'Contacto' },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-bgDark/60 border-b border-black/5 dark:border-white/10">
            <div className="max-w-7xl mx-auto flex items-center h-16 px-4">
                {/* logo */}
                <Link to="/" className="font-heading text-lg md:text-xl">
                    fajardo.<span className="font-bold">devfolio</span>
                </Link>

                {/* Desktop menu */}
                <nav className="ml-auto hidden md:flex items-center gap-8 font-sub">
                    {links.map(l => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className="hover:text-accentTeal dark:hover:text-accentTealLight transition"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* Hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="ml-auto md:hidden flex flex-col justify-center gap-1 w-8 h-8"
                    aria-label="Abrir menú"
                >
                    <span className={`h-0.5 bg-current transition ${open && 'rotate-45 translate-y-1'}`} />
                    <span className={`h-0.5 bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`h-0.5 bg-current transition ${open && '-rotate-45 -translate-y-1'}`} />
                </button>
            </div>

            {/* Mobile drawer */}
            <nav
                className={`md:hidden bg-white dark:bg-bgDark transition-transform duration-300 ${
                    open ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <ul className="flex flex-col items-center py-6 space-y-4 font-sub">
                    {links.map(l => (
                        <li key={l.to}>
                            <Link
                                to={l.to}
                                onClick={() => setOpen(false)}
                                className="text-lg hover:text-accentTeal dark:hover:text-accentTealLight"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
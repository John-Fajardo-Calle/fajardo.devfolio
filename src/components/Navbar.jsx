// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();          // cierra menú al cambiar de ruta

    // Cierra automáticamente el drawer al navegar
    useEffect(() => setIsOpen(false), [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-bgDark/70 backdrop-blur-md border-b border-transparent-dark">
            <div className="mx-auto max-w-6xl px-4 flex items-center h-16">
                {/*  Branding  */}
                <Link to="/" className="font-heading text-lg font-bold tracking-wide">
                    fajardo.<span className="text-accentTeal dark:text-accentTealLight">devfolio</span>
                </Link>

                {/*  --- Desktop nav ------------------------------------------------ */}
                <nav className="ml-auto hidden md:flex items-center gap-8 font-sub text-sm">
                    {["Inicio", "Proyectos", "CV", "Sobre mí", "Contacto"].map(label => {
                        const to =
                            label === "Inicio" ? "/" : "/" + label.toLowerCase().replace(" ", "");
                        return (
                            <Link
                                key={label}
                                to={to}
                                className="relative after:absolute after:inset-x-0 after:-bottom-1
                           after:h-0.5 after:scale-x-0 after:bg-accentTeal
                           after:transition-transform hover:after:scale-x-100">
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/*  --- Hamburger -------------------------------------------------- */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto md:hidden p-2 focus:outline-none"
                    aria-label="Abrir menú">
                    <div className={`h-0.5 w-6 bg-current transition-all
                           ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
                    <div className={`h-0.5 w-6 bg-current my-1 transition-opacity
                           ${isOpen ? "opacity-0" : ""}`} />
                    <div className={`h-0.5 w-6 bg-current transition-all
                           ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
                </button>
            </div>

            {/* --- Mobile drawer ----------------------------------------------- */}
            <nav
                className={`md:hidden bg-white dark:bg-bgDark border-t dark:border-gray-700
                    transition-transform duration-300
                    ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <ul className="flex flex-col items-center py-6 space-y-4 font-sub text-base">
                    {["Inicio", "Proyectos", "CV", "Sobre mí", "Contacto"].map(label => {
                        const to =
                            label === "Inicio" ? "/" : "/" + label.toLowerCase().replace(" ", "");
                        return (
                            <li key={label}>
                                <Link to={to} className="hover:text-accentTeal">
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

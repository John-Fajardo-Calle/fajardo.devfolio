// src/pages/Home.jsx
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Home() {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === 'dark'

    return (
        <section
            className={`
        flex flex-col items-center justify-center
        min-h-[80vh] px-4 text-center
        ${isDark ? 'bg-bgDark text-textLight' : 'bg-bgLight text-textDark'}
      `}
        >
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4">
                Hola, soy John Fajardo
            </h1>

            <p
                className={`
          font-bodyLong leading-[1.6]
          text-base md:text-lg mb-6
          ${isDark ? 'text-opacity-90' : ''}
        `}
            >
                Bienvenido a mi portafolio. Explora mis proyectos y mi currículum.
            </p>

            <div className="flex gap-4">
                <a
                    href="/projects"
                    className={`
            font-accent uppercase px-6 py-3 rounded-lg shadow-md
            transition hover:opacity-90
            ${isDark
                        ? 'bg-accentTealLight text-bgDark'
                        : 'bg-accentTeal text-white'}
          `}
                >
                    Ver Proyectos
                </a>
                <a
                    href="/contact"
                    className={`
            font-accent uppercase px-6 py-3 rounded-lg shadow-md
            transition hover:opacity-90
            ${isDark
                        ? 'bg-accentGold text-bgDark'
                        : 'bg-accentCoral text-white'}
          `}
                >
                    Contáctame
                </a>
            </div>
        </section>
    )
}

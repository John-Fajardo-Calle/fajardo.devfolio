import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <section
            className="
        flex flex-col items-center justify-center
        min-h-[calc(100vh-4rem)]   /* 4rem = altura del navbar */
        text-center
        bg-gradient-to-br from-bgLight via-white to-teal-50
        dark:bg-none dark:bg-[#1A2238]
      "
        >
            <h1 className="font-heading text-4xl md:text-5xl mb-4 text-textDark dark:text-textLight">
                ¡Hola! Soy John Fajardo
            </h1>

            <p className="font-bodyShort text-lg md:text-xl max-w-xl mb-10 text-[#555] dark:text-[#CCCCCC]">
                Desarrollador backend e Ingeniero Mecatrónico. Explora mis proyectos,
                mi CV, y descubre cómo combino software y hardware para resolver
                problemas reales.
            </p>

            <div className="flex gap-6">
                <Link
                    to="/projects"
                    className="
            px-6 py-3 rounded-full font-accent
            bg-accentTeal text-white hover:opacity-90
            transition
          "
                >
                    Ver Proyectos
                </Link>
                <Link
                    to="/contact"
                    className="
            px-6 py-3 rounded-full font-accent
            bg-accentCoral text-white hover:opacity-90
            transition
          "
                >
                    Hablemos
                </Link>
            </div>
        </section>
    )
}
import React from 'react'

export default function Footer() {
    return (
        <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} John Fajardo. Todos los derechos reservados.
        </footer>
    )
}
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    darkMode: 'class',
    theme: {
        screens: {
            md: '640px', // ahora el menú desktop aparece con ≥640px
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                // Claro
                bgLight: "#F5F5F5",
                textDark: "#2A2D43",
                accentTeal: "#4ECDC4",
                accentCoral: "#FF6B6B",
                // Oscuro
                bgDark: "#1A2238",
                textLight: "#E0E0E0",
                accentTealLight: "#00B4D8",
                accentGold: "#FFD700",
            },
            fontFamily: {
                heading: ["Poppins", "sans-serif"],
                sub: ["Inter", "sans-serif"],
                bodyShort: ["Open Sans", "sans-serif"],
                bodyLong: ["Roboto", "sans-serif"],
                accent: ["Montserrat", "sans-serif"],
                code: ["Fira Code", "monospace"],
            },
        },
    },
    plugins: [],
}
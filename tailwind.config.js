// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                //---------------------------
                //   Paleta personalizada
                //---------------------------
                bgLight:        '#F5F5F5',
                textDark:       '#2A2D43',
                accentTeal:     '#4ECDC4',
                accentCoral:    '#FF6B6B',
                bgDark:         '#1A2238',
                textLight:      '#E0E0E0',
                accentTealLight:'#00B4D8',
                accentGold:     '#FFD700',
            },

            /* 👇  ESTA LÍNEA ES NUEVA  */
            ringColor: {
                accentTeal: '#4ECDC4',       // <-- habilita ring-accentTeal
            },

            fontFamily: {
                heading:   ['Poppins', 'sans-serif'],
                sub:       ['Inter', 'sans-serif'],
                bodyShort: ['Open Sans', 'sans-serif'],
                bodyLong:  ['Roboto', 'sans-serif'],
                accent:    ['Montserrat', 'sans-serif'],
                code:      ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}

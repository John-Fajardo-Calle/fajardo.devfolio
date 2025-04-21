// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
// import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CV from './pages/CV'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
    return (
        <ThemeProvider>
            {/* Si más adelante necesitas multilenguaje, reactiva LanguageProvider */}
            {/* <LanguageProvider> */}

            {/*
          basename debe coincidir con el nombre de tu repo en GitHub Pages,
          para que React Router genere URLs como:
          /fajardo.devfolio/, /fajardo.devfolio/projects, etc.
        */}
            <Router basename="/fajardo.devfolio">
                <Navbar />

                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cv" element={<CV />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        {/* Opcional: ruta “catch‑all” para 404 */}
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </main>

                <Footer />
            </Router>

            {/* </LanguageProvider> */}
        </ThemeProvider>
    )
}

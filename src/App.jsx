import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

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
            <Router>
                <Navbar />

                {/* Contenedor principal desplazado en desktop */}
                <main className="pt-16 md:pt-0 md:ml-60">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cv" element={<CV />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>

                <Footer />
            </Router>
        </ThemeProvider>
    )
}

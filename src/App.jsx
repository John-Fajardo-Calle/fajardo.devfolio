import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useIsMobile from './hooks/useIsMobile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CV from './pages/CV';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

function AnimatedRoutes() {
    const location = useLocation();
    const isMobile = useIsMobile();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: isMobile ? 50 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -50 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/cv" element={<CV />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/project/:projectId" element={<ProjectDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    const basename = import.meta.env.DEV ? '/' : '/fajardo.devfolio/';
    return (
        <BrowserRouter basename={basename}>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                <Navbar />
                <main className="flex-grow overflow-x-hidden">
                    <AnimatedRoutes />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
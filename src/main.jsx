import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';

(function () {
    const originalPath = sessionStorage.getItem('redirect');
    if (originalPath) {
        sessionStorage.removeItem('redirect');
        if (originalPath !== (window.location.pathname + window.location.search + window.location.hash)) {
            window.history.replaceState(null, null, originalPath);
            console.log("SPA Redirect: Restored path to", originalPath);
        }
    }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';

(function () {
    const redirectPath = sessionStorage.getItem('redirect');

    if (redirectPath) {
        sessionStorage.removeItem('redirect');
        const base = import.meta.env.BASE_URL;


        const newPath = base + (redirectPath === '/' ? '' : (redirectPath.startsWith('/') ? redirectPath.substring(1) : redirectPath));


        if (newPath !== (window.location.pathname + window.location.search + window.location.hash) ) {
            window.history.replaceState(null, null, newPath);
        } else {
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
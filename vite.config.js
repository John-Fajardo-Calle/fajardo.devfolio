import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  };

  if (command === 'build') {
    config.base = '/fajardo.devfolio/';
  }

  return config;
});
# fajardo.devfolio - John Fajardo's Professional Portfolio

fajardo.devfolio is a modern, responsive professional portfolio website for John Fajardo, showcasing his profile as a Backend Developer and Mechatronics Engineer. It serves as a technical portfolio, curriculum vitae presentation, and a personal showcase for job opportunities.

The site is built with React, Vite, and TailwindCSS, featuring dynamic language switching (Spanish/English), dark/light mode support with persistence, a filterable project gallery, and a functional contact form.

**Live Demo (GitHub Pages):** `https://TU_USUARIO_GITHUB.github.io/fajardo.devfolio/`
*(Replace `TU_USUARIO_GITHUB` with your GitHub username)*

## Features

* **Professional Profile Presentation:** Clearly showcases John Fajardo's skills and experience.
* **Bilingual Content:** Fully supports English and Spanish, with dynamic language switching (using `react-i18next`).
* **Dark/Light Mode:** Theme toggling with persistence in `localStorage` (using React Context API).
* **Responsive Design:** Adapts to all device sizes (desktop, tablet, mobile).
* **Project Portfolio:**
    * Gallery of technical projects with filtering capabilities (by main programming language and integration projects).
    * Detailed view for each project.
    * Animated transitions for project cards when filtering (using Framer Motion).
    * Filter states persist across page refreshes and language changes (using `sessionStorage`).
* **Curriculum Vitae:**
    * Visually presented CV page.
    * Option to download CV in PDF (ES/EN), dynamically updated with language change.
* **Contact Options:**
    * Functional contact form using EmailJS.
    * Direct WhatsApp contact button.
* **Animated Text Transitions:** Subtle "card flip" text animations on language change for UI elements (using a custom `FlippableText` component).

## Tech Stack

* **Frontend:** React, Vite, JavaScript
* **Styling:** TailwindCSS
* **Routing:** React Router DOM
* **Internationalization (i18n):** `react-i18next`, `i18next-browser-languagedetector`
* **Animations:** Framer Motion (for project card filtering)
* **Email Service:** EmailJS
* **Build Tool:** Vite

## Project Structure

A brief overview of the project's folder structure:

<pre>
fajardo.devfolio/
├── public/                     # Static assets (CVs, logos, favicon)
│   └── assets/
│       ├── cv/
│       └── logos/
├── src/
│   ├── assets/thumbnails/      # Project thumbnail images
│   ├── components/             # Reusable UI components
│   ├── context/                # React Context for global state (Theme)
│   ├── data/                   # JSON files for project data (ES/EN)
│   ├── pages/                  # Page components for routing
│   ├── services/               # Service integrations (e.g., EmailJS)
│   ├── translations/           # i18n JSON translation files (ES/EN)
│   ├── App.jsx                 # Main app component with router setup
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles and TailwindCSS setup
│   └── i18n.js                 # i18next configuration
├── index.html                  # Main HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Project dependencies and scripts
</pre>


## Setup and Installation

1.  **Clone the repository:**
    `git clone https://github.com/TU_USUARIO_GITHUB/fajardo.devfolio.git`
    `cd fajardo.devfolio`
2.  **Install dependencies:**
    `npm install`
    *(Or `yarn install` if you prefer yarn)*
3.  **Configure EmailJS Credentials (Recommended: Use Environment Variables):**
    * The contact form uses EmailJS. For security and best practice, you should use environment variables for your EmailJS credentials.
    * Create a `.env` file in the root of your project:
        ```
        VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
        VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
        VITE_EMAILJS_USER_ID=YOUR_PUBLIC_KEY
        ```
    * Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your actual EmailJS credentials.
    * Update `src/services/email.js` to use these environment variables:
        ```javascript
        // src/services/email.js
        import emailjs from 'emailjs-com';

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

        export const sendEmail = (templateParams) => {
          // ... (resto de la función sendEmail)
          return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
        };
        ```
    * **Important:** Add `.env` to your `.gitignore` file to prevent committing your secret keys.

4.  **Run the development server:**
    `npm run dev`
    The site should now be running on `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run lint`: Lints the project files (if ESLint is configured).
* `npm run preview`: Serves the production build locally for preview.

## Deployment (GitHub Pages)

This project is configured for deployment on GitHub Pages.
1.  Ensure `homepage` in `package.json` and `base` in `vite.config.js` are correctly set to `https://TU_USUARIO_GITHUB.github.io/fajardo.devfolio/` and `/fajardo.devfolio/` respectively.
2.  A `404.html` file is included in the root and a corresponding script in `src/main.jsx` to handle SPA routing (deep linking and refresh issues) on GitHub Pages.
3.  Build the project: `npm run build`.
4.  Deploy the contents of the `dist` folder to your `gh-pages` branch (or configure GitHub Pages to serve from `main` branch /docs folder after build).

## Contributing

If you plan to have others contribute:
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.


---
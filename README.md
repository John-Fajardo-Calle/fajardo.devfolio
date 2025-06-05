# fajardo.devfolio - My Professional Portfolio

Welcome to fajardo.devfolio! This is my personal professional portfolio, built to effectively showcase my profile as a Backend Developer and Mechatronics Engineer. It serves as my technical showcase, CV presentation, and a platform for new career opportunities.

The site is developed with React, Vite, and TailwindCSS. It's fully responsive, bilingual (Spanish/English), features dynamic theme (dark/light mode) switching with persistence, a filterable project gallery with animations, and a functional contact system.

**Live Demo (GitHub Pages):** `https://john-fajardo-calle.github.io/fajardo.devfolio/`

## Key Features

* **Professional Profile Presentation:** Clearly presents my skills, experience, and engineering background.
* **Bilingual Content (ES/EN):** Full support for Spanish and English, with dynamic language switching powered by `react-i18next` and `i18next-browser-languagedetector` for persistence.
* **Dark/Light Mode:** User-selectable theme toggling with the preference saved in `localStorage`, implemented using React Context API.
* **Fully Responsive Design:** Adapts seamlessly to all device sizes (desktop, tablets, and mobile).
* **Interactive Project Portfolio:**
    * A gallery showcasing my technical projects, filterable by main programming language and integration project types.
    * Detailed view for each project.
    * Smooth, animated transitions for project cards when filters are applied, powered by Framer Motion.
    * Applied filter states are persisted across page refreshes and language changes using `sessionStorage`.
* **Comprehensive Curriculum Vitae:**
    * A visually organized CV page.
    * PDF versions of my CV (in Spanish and English) are available for download, with the download option updating dynamically based on the selected site language.
* **Direct Contact Options:**
    * A functional contact form that sends emails directly using EmailJS.
    * A quick contact button via WhatsApp.
* **Engaging UI/UX:**
    * Subtle "card flip" text animations on language change for key UI elements, enhancing the user experience.
    * Custom favicons and a polished Navbar logo.

## Tech Stack

* **Frontend:** React, Vite, JavaScript
* **Styling:** TailwindCSS
* **Routing:** React Router DOM v6
* **State Management:** React Context API, `useState`, `useEffect`, `useMemo`, `useRef`
* **Internationalization (i18n):** `react-i18next`, `i18next-browser-languagedetector`
* **Animations:** Framer Motion
* **Email Service:** EmailJS
* **Build Tool & Dev Server:** Vite

## Project Structure

Here’s a brief overview of the project's folder structure:


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


## Getting Started: Setup and Installation

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/john-fajardo-calle/fajardo.devfolio.git](https://github.com/john-fajardo-calle/fajardo.devfolio.git)
    cd fajardo.devfolio
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    *(Or `yarn install` if you use Yarn)*

3.  **Configure EmailJS Credentials (Using Environment Variables):**
    The contact form relies on EmailJS. For security and proper configuration, use environment variables for your EmailJS credentials.

    * Create a `.env` file in the root of your project.
    * Add your EmailJS credentials to the `.env` file like this:
        ```env
        VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
        VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
        VITE_EMAILJS_USER_ID=YOUR_PUBLIC_KEY
        ```
    * Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your actual credentials from your EmailJS dashboard.
    * The `src/services/email.js` file is already set up to use these environment variables:
        ```javascript
        // src/services/email.js
        // ...
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
        // ...
        ```
    * **Crucial:** Ensure your `.env` file is listed in your `.gitignore` file to prevent accidentally committing your secret keys.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

In the project directory, you can run:

* **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR).
* **`npm run build`**: Bundles the app for production into the `dist` folder.
* **`npm run lint`**: Lints the project files using ESLint (based on your `package.json`).
* **`npm run preview`**: Serves the production build locally to preview before deployment.
* **`npm run deploy`**: Builds the project and deploys it to GitHub Pages using the `gh-pages` branch (this script includes `predeploy` which runs `npm run build`).

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages:

1.  Ensure the `homepage` field in `package.json` is set to `https://john-fajardo-calle.github.io/fajardo.devfolio/`.
2.  Ensure the `base` property in `vite.config.js` is set to `/fajardo.devfolio/`.
3.  Ensure the `basename` prop for `<BrowserRouter>` in `src/App.jsx` is set to `/fajardo.devfolio/` for production builds (this is handled conditionally).
4.  A `404.html` file (placed in `public/`) and a redirect script in `src/main.jsx` are implemented to handle client-side routing correctly on GitHub Pages (addressing issues with deep linking and page refreshes).
5.  To deploy, simply run:
    ```bash
    npm run deploy
    ```
    Then, configure your GitHub repository's Pages settings to deploy from the `gh-pages` branch.

---
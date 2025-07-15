import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FadingText from '../components/FadingText';
import CVSection from '../components/CVSection';

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.031 23.031 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const AcademicCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 M5.121 15.121A12.07 12.07 0 0112 12m0 0A12.07 12.07 0 0118.879 15.121" />
    </svg>
);

const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 6.343l-2.828 2.828M17.657 17.657l2.828-2.828m0-11.314l-2.828-2.828M12 21a9 9 0 110-18 9 9 0 010 18zm0 0V3" />
    </svg>
);

const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9.5a18.03 18.03 0 01-5.664-1.44m12.336-3.06a18.03 18.03 0 01-5.664 1.44m5.664-1.44L18 13.5M3 17h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const CV = () => {
    const { t, i18n } = useTranslation();
    const ANIMATION_DURATION = 600;

    const [titleState, setTitleState] = useState({ front: t('cv.title', 'Currículum Vitae'), back: t('cv.title', 'Currículum Vitae'), isFlipped: false });
    const [downloadState, setDownloadState] = useState(() => {
        const text = i18n.language === 'es' ? t('cv.downloadES', 'Descargar CV en Español') : t('cv.downloadEN', 'Descargar CV en Inglés');
        return { front: text, back: text, isFlipped: false };
    });

    const prevLangRef = useRef(i18n.language);

    const currentLang = i18n.language;

    useEffect(() => {
        const oldLang = prevLangRef.current;
        if (oldLang === i18n.language) return;

        const newTitle = t('cv.title', 'Currículum Vitae');
        const newDownload = i18n.language === 'es'
            ? t('cv.downloadES', 'Descargar CV en Español')
            : t('cv.downloadEN', 'Descargar CV en Inglés');

        const oldTitle = i18n.getFixedT(oldLang)('cv.title', 'Currículum Vitae');
        const oldDownload = oldLang === 'es'
            ? i18n.getFixedT(oldLang)('cv.downloadES', 'Descargar CV en Español')
            : i18n.getFixedT(oldLang)('cv.downloadEN', 'Descargar CV en Inglés');

        setTitleState({ front: oldTitle, back: newTitle, isFlipped: true });
        setDownloadState({ front: oldDownload, back: newDownload, isFlipped: true });

        prevLangRef.current = i18n.language;

        const timeout = setTimeout(() => {
            setTitleState({ front: newTitle, back: newTitle, isFlipped: false });
            setDownloadState({ front: newDownload, back: newDownload, isFlipped: false });
        }, ANIMATION_DURATION);

        return () => clearTimeout(timeout);
    }, [i18n.language, t, i18n]);

    const cvBasePath = `${import.meta.env.BASE_URL}assets/cv/`;
    const cvFile = currentLang === 'es'
        ? `${cvBasePath}CV-John_Fajardo-ES.pdf`
        : `${cvBasePath}CV-John_Fajardo-EN.pdf`;


    const experienceData = [
        {
            mainTitle: t('cv.experience.job1.title', 'Desarrollador Backend Senior'),
            subTitle: t('cv.experience.job1.company', 'Tech Solutions Inc.'),
            date: t('cv.experience.job1.date', 'Ene 2022 - Presente'),
            location: t('cv.experience.job1.location', 'Lima, Perú'),
            description: [
                t('cv.experience.job1.desc1', 'Liderazgo en el desarrollo de APIs RESTful para clientes internacionales.'),
                t('cv.experience.job1.desc2', 'Optimización de bases de datos PostgreSQL y MongoDB.'),
                t('cv.experience.job1.desc3', 'Implementación de microservicios con Docker y Kubernetes.'),
            ],
            technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
        },
        {
            mainTitle: t('cv.experience.job2.title', 'Ingeniero Mecatrónico'),
            subTitle: t('cv.experience.job2.company', 'Automatización Industrial XYZ'),
            date: t('cv.experience.job2.date', 'Jun 2019 - Dic 2021'),
            location: t('cv.experience.job2.location', 'Arequipa, Perú'),
            description: [
                t('cv.experience.job2.desc1', 'Diseño y desarrollo de sistemas de control automatizado.'),
                t('cv.experience.job2.desc2', 'Programación de PLCs y HMI Siemens.'),
            ],
            technologies: ['PLC Siemens', 'SolidWorks', 'Python', 'C++'],
        },
    ];

    const educationData = [
        {
            mainTitle: t('cv.education.degree1.title', 'Máster en Inteligencia Artificial'),
            subTitle: t('cv.education.degree1.institution', 'Universidad Internacional Online'),
            date: t('cv.education.degree1.date', '2023 - Cursando'),
            location: t('cv.education.degree1.location', 'Online'),
            description: t('cv.education.degree1.desc', 'Especialización en Machine Learning y Deep Learning.'),
        },
        {
            mainTitle: t('cv.education.degree2.title', 'Ingeniería Mecatrónica'),
            subTitle: t('cv.education.degree2.institution', 'Universidad Nacional de Ingeniería'),
            date: t('cv.education.degree2.date', '2014 - 2019'),
            location: t('cv.education.degree2.location', 'Lima, Perú'),
            description: t('cv.education.degree2.desc', 'Tesis sobre robótica aplicada a la industria.'),
        },
    ];

    const skillsData = {
        programming: {
            title: t('cv.skills.programming.title', "Lenguajes de Programación"),
            items: [
                { mainTitle: 'JavaScript (ES6+)', subTitle: t('cv.skills.programming.levelAdvanced', 'Avanzado') },
                { mainTitle: 'Python', subTitle: t('cv.skills.programming.levelAdvanced', 'Avanzado') },
                { mainTitle: 'Node.js', subTitle: t('cv.skills.programming.levelAdvanced', 'Avanzado') },
                { mainTitle: 'C++', subTitle: t('cv.skills.programming.levelIntermediate', 'Intermedio') },
                { mainTitle: 'Java', subTitle: t('cv.skills.programming.levelIntermediate', 'Intermedio') },
            ],
            icon: <CogIcon />
        },
        backend: {
            title: t('cv.skills.backend.title', "Desarrollo Backend"),
            items: [
                { mainTitle: 'Express.js, NestJS' },
                { mainTitle: 'Django, Flask' },
                { mainTitle: 'APIs RESTful & GraphQL' },
                { mainTitle: 'Microservicios' },
            ],
            icon: <CogIcon />
        },
        databases: {
            title: t('cv.skills.databases.title', "Bases de Datos"),
            items: [
                { mainTitle: 'MongoDB, PostgreSQL, MySQL' },
                { mainTitle: 'SQL, NoSQL' },
            ],
            icon: <CogIcon />
        },
        tools: {
            title: t('cv.skills.tools.title', "Herramientas y Tecnologías"),
            items: [
                { mainTitle: 'Git, GitHub, GitLab' },
                { mainTitle: 'Docker, Kubernetes' },
                { mainTitle: 'AWS, Google Cloud' },
                { mainTitle: 'Linux, Bash' },
            ],
            icon: <CogIcon />
        }
        //Añadir más categorías de habilidades aquí
    };

    const certificatesData = [
        {
            mainTitle: t('cv.certificates.cert1.title', 'AWS Certified Developer - Associate'),
            subTitle: t('cv.certificates.cert1.issuer', 'Amazon Web Services'),
            date: t('cv.certificates.cert1.date', 'Marzo 2023'),
            description: t('cv.certificates.cert1.desc', 'Validación de habilidades en desarrollo y mantenimiento de aplicaciones en AWS.'),
        },
        // Añadir más certificados aquí
    ];

    const languagesSpokenData = [
        { mainTitle: t('cv.languages.lang1.name', 'Español'), subTitle: t('cv.languages.lang1.level', 'Nativo') },
        { mainTitle: t('cv.languages.lang2.name', 'Inglés'), subTitle: t('cv.languages.lang2.level', 'Avanzado (C1)') },
    ];


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                <FadingText
                    oldText={<h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">{titleState.front}</h1>}
                    newText={<h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">{titleState.back}</h1>}
                    isFlipped={titleState.isFlipped}
                    duration={ANIMATION_DURATION}
                    className="block"
                    mode="block"
                />
                <a
                    href={cvFile}
                    download
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <FadingText
                        oldText={<span>{downloadState.front}</span>}
                        newText={<span>{downloadState.back}</span>}
                        isFlipped={downloadState.isFlipped}
                        duration={ANIMATION_DURATION}
                        className="block"
                        mode="block"
                    />
                </a>
            </div>

            {/* Sección de Experiencia */}
            <CVSection
                title={t('cv.sections.experience', 'Experiencia Profesional')}
                items={experienceData}
                icon={<BriefcaseIcon />}
            />

            {/* Sección de Educación */}
            <CVSection
                title={t('cv.sections.education', 'Educación')}
                items={educationData}
                icon={<AcademicCapIcon />}
            />

            {/* Sección de Habilidades */}
            {Object.entries(skillsData).map(([key, skillCategory]) => (
                <CVSection
                    key={key}
                    title={skillCategory.title}
                    items={skillCategory.items}
                    icon={skillCategory.icon || <CogIcon />}
                />
            ))}

            {/* Sección de Certificados */}
            <CVSection
                title={t('cv.sections.certificates', 'Certificados y Cursos')}
                items={certificatesData}
                icon={<SparklesIcon />}
            />

            {/* Sección de Idiomas */}
            <CVSection
                title={t('cv.sections.languages', 'Idiomas')}
                items={languagesSpokenData}
                icon={<LanguageIcon />}
            />

            {/* Añadir más secciones como Proyectos Destacados, Referencias, etc. */}
        </div>
    );
};

export default CV;
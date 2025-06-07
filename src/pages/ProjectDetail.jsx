import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FlippableText from '../components/FlippableText';

import projectsDataES from '../data/projects_es.json';
import projectsDataEN from '../data/projects_en.json';

const ANIMATION_DURATION = 600;

const GithubIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.074 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const ProjectDetail = () => {
    const { projectId } = useParams();
    const { t, i18n, ready } = useTranslation();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [flippableTitle, setFlippableTitle] = useState({ frontText: '', backText: '', isFlipped: false });

    const prevLangRef = useRef(i18n.language);
    const initialLoadDoneRef = useRef(false);

    useEffect(() => {
        if (!ready) return;

        const currentLang = i18n.language;
        const data = currentLang === 'es' ? projectsDataES : projectsDataEN;
        const foundProject = data.find(p => p.id === projectId);

        if (foundProject) {
            setProject(foundProject);

            const oldLang = prevLangRef.current;
            const isActualLanguageChange = initialLoadDoneRef.current && oldLang !== null && oldLang !== currentLang;

            const currentTitle = foundProject.title;
            let oldTitleForFlip = currentTitle;

            if (isActualLanguageChange) {
                const oldData = oldLang === 'es' ? projectsDataES : projectsDataEN;
                const oldProjectVersion = oldData.find(p => p.id === projectId);
                if (oldProjectVersion) {
                    oldTitleForFlip = oldProjectVersion.title;
                }
            }

            setFlippableTitle({
                frontText: isActualLanguageChange ? oldTitleForFlip : currentTitle,
                backText: currentTitle,
                isFlipped: isActualLanguageChange,
            });

            if (isActualLanguageChange) {
                setTimeout(() => {
                    setFlippableTitle(prev => ({
                        ...prev,
                        isFlipped: false,
                        frontText: prev.backText,
                    }));
                }, ANIMATION_DURATION);
            }

        } else {
            setProject(null);
        }

        setLoading(false);
        if (!initialLoadDoneRef.current) initialLoadDoneRef.current = true;
        prevLangRef.current = currentLang;

    }, [projectId, i18n.language, ready, t]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    {t('projects.loadingProject', 'Cargando proyecto...')}
                </p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
                    {t('projects.notFoundTitle', 'Proyecto no Encontrado')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {t('projects.notFoundMessage', 'Lo sentimos, el proyecto que buscas no existe o no está disponible.')}
                </p>
                <Link
                    to="/projects"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    {t('projects.backToProjects', 'Volver a Proyectos')}
                </Link>
            </div>
        );
    }

    const mainThumbnailUrl = project.thumbnailUrl || `https://via.placeholder.com/800x450?text=${encodeURIComponent(project.title)}`;

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12">
            <article className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                <div className="p-4 sm:p-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('projects.backToPrevious', 'Volver')}
                    </button>
                </div>

                <header className="p-6 pt-0 sm:p-8 sm:pt-2 text-center">
                    <FlippableText
                        oldText={<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">{flippableTitle.frontText}</h1>}
                        newText={<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">{flippableTitle.backText}</h1>}
                        isFlipped={flippableTitle.isFlipped}
                        duration={ANIMATION_DURATION}
                        className="inline-block"
                    />
                    {project.category && (
                        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold mt-2">
                            {project.category}
                        </p>
                    )}
                </header>

                <img
                    src={project.images && project.images.length > 0 ? project.images[0] : mainThumbnailUrl}
                    alt={t('projects.mainImageAlt', 'Imagen principal del proyecto {{title}}', { title: project.title })}
                    className="w-full h-auto max-h-[500px] object-contain bg-gray-100 dark:bg-gray-700"
                />

                <div className="p-6 sm:p-8">
                    <section className="mb-8 prose prose-lg dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
                            {t('projects.descriptionTitle', 'Descripción del Proyecto')}
                        </h2>
                        {Array.isArray(project.longDescription) ? (
                            project.longDescription.map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))
                        ) : (
                            <p>{project.longDescription}</p>
                        )}
                    </section>

                    {project.images && project.images.length > 1 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                                {t('projects.galleryTitle', 'Galería de Imágenes')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {project.images.slice(project.thumbnailUrl === project.images[0] ? 1 : 0).map((image, index) => (
                                    <a key={index} href={image} target="_blank" rel="noopener noreferrer" className="block group">
                                        <img
                                            src={image}
                                            alt={t('projects.galleryImageAlt', 'Imagen {{index}} de la galería del proyecto {{title}}', { index: index + 1, title: project.title })}
                                            className="w-full h-48 object-cover rounded-md shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                                        />
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                                {t('projects.technologiesUsedTitle', 'Tecnologías Utilizadas')}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {(project.repoUrl || project.liveUrl) && (
                        <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                                {t('projects.linksTitle', 'Enlaces')}
                            </h2>
                            <div className="flex items-center space-x-6">
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline transition-colors"
                                        title={t('projects.repoLinkTitle', 'Ver repositorio en GitHub')}
                                    >
                                        <GithubIcon className="w-5 h-5 mr-2" />
                                        {t('projects.repository', 'Repositorio')}
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline transition-colors"
                                        title={t('projects.liveLinkTitle', 'Ver demo en vivo')}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        {t('projects.liveDemo', 'Demo en Vivo')}
                                    </a>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </div>
    );
};

export default ProjectDetail;
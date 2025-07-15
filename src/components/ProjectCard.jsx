import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import getAssetUrl from '../utils/getAssetUrl';

const ProjectCard = ({ project, onTechnologyTagClick }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const thumbnailUrl = project.thumbnailUrl
        ? getAssetUrl(project.thumbnailUrl)
        : `https://via.placeholder.com/400x250?text=${encodeURIComponent(project.title)}`;

    const handleNavigateToDetails = (e) => {
        if (e.target.closest('button.technology-tag') || e.target.closest('a.external-link')) {
            return;
        }
        navigate(`/project/${project.id}`);
    };

    const moreTechsSpanStyle = "text-gray-500 dark:text-gray-400 text-sm ml-1 hover:underline cursor-pointer transition-colors duration-300 ease-out";

    const categoryStyle = "text-[16px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 pointer-events-none";

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.1)]
                       overflow-hidden transform transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
                       flex flex-col h-full cursor-pointer p-6"
            onClick={handleNavigateToDetails}
            role="link"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigateToDetails(e); }}
        >

            <div className="block group pointer-events-none">
                <img
                    src={thumbnailUrl}
                    alt={t('projects.thumbnailAlt', 'Miniatura del proyecto {{title}}', { title: project.title })}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-sm"
                />
            </div>

            <div className="flex flex-col flex-grow pt-4">
                {project.category && (
                    <p className={categoryStyle}>
                        {project.category}
                    </p>
                )}
                <h3
                    className="text-2xl font-bold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pointer-events-none"
                >
                    {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow pointer-events-none">
                    {project.shortDescription}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 pointer-events-none">
                            {t('projects.technologies', 'Tecnologías')}
                        </h4>
                        <div className="flex flex-wrap gap-2 items-center">
                            {project.technologies.slice(0, 3).map((tech) => (
                                <button
                                    key={tech}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTechnologyTagClick(tech);
                                    }}
                                    className="technology-tag bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                    title={t('projects.filterByTech', 'Filtrar por {{tech}}', { tech })}
                                >
                                    {tech}
                                </button>
                            ))}
                            {project.technologies.length > 3 && (
                                <span
                                    className={moreTechsSpanStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigateToDetails(e);
                                    }}
                                    role="link"
                                    tabIndex={0}
                                    onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleNavigateToDetails(e); } }}
                                    title={t('projects.viewMoreAlt', 'Ver más detalles del proyecto')}
                                >
                                    {t('projects.andMoreTechs', '+ {{count}} más', { count: project.technologies.length - 3 })}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-start space-x-4">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            title={t('projects.repoLinkTitle', 'Ver repositorio en GitHub')}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.074 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            title={t('projects.liveLinkTitle', 'Ver demo en vivo')}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        shortDescription: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string),
        repoUrl: PropTypes.string,
        liveUrl: PropTypes.string,
        projectType: PropTypes.string,
        languages: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onTechnologyTagClick: PropTypes.func.isRequired,
};

export default ProjectCard;
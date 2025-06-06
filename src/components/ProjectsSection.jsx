import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import FlippableText from './FlippableText';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const MAIN_PROGRAMMING_LANGUAGES = ["C++", "Python", "JavaScript", "Java", "MATLAB/Simulink", "PHP"];
const MAX_TEMPORARY_FILTERS = 3;
const FLIP_ANIMATION_DURATION = 600;
const CARD_ANIMATION_DURATION = 0.4;

const isIntegrationProject = (project) => {
    if (!project || !project.projectType) return false;
    return project.projectType === 'integration';
};

const getProjectMainLanguages = (project) => {
    if (!project || !project.languages) return [];
    return project.languages || [];
};

const ProjectsSection = ({ projectDataEN, projectDataES, titleKey, storagePrefix }) => {
    const { t, i18n, ready } = useTranslation();

    const SESSION_STORAGE_KEYS = {
        VIEW_MODE: `${storagePrefix}ViewMode`,
        ACTIVE_MAIN_FILTER: `${storagePrefix}ActiveMainFilter`,
        TEMPORARY_FILTERS: `${storagePrefix}TemporaryFilters`
    };

    const [allProjects, setAllProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);

    const [viewMode, setViewMode] = useState(() =>
        sessionStorage.getItem(SESSION_STORAGE_KEYS.VIEW_MODE) || 'language'
    );
    const [activeMainFilter, setActiveMainFilter] = useState(() =>
        sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_MAIN_FILTER) || 'all'
    );
    const [temporaryFilters, setTemporaryFilters] = useState(() => {
        const saved = sessionStorage.getItem(SESSION_STORAGE_KEYS.TEMPORARY_FILTERS);
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [flippableTexts, setFlippableTexts] = useState({});
    const prevLangRef = useRef(i18n.language);
    const initialLoadProcessedForLang = useRef(new Set());

    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.VIEW_MODE, viewMode);
    }, [viewMode]);

    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.ACTIVE_MAIN_FILTER, activeMainFilter);
    }, [activeMainFilter]);

    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.TEMPORARY_FILTERS, JSON.stringify(temporaryFilters));
    }, [temporaryFilters]);

    useEffect(() => {
        if (!ready) return;

        const currentLang = i18n.language;
        const currentProjectData = currentLang === 'es' ? projectDataES : projectDataEN;
        setAllProjects(currentProjectData);

        initialLoadProcessedForLang.current.add(currentLang);
        prevLangRef.current = currentLang;

    }, [i18n.language, ready, projectDataEN, projectDataES]);

    const languagesForIntegrationViewButtons = useMemo(() => {
        if (!ready || !allProjects.length) return [];
        const integrationProjs = allProjects.filter(p => isIntegrationProject(p));
        const langs = new Set();
        integrationProjs.forEach(p => {
            getProjectMainLanguages(p).forEach(lang => {
                if (MAIN_PROGRAMMING_LANGUAGES.includes(lang)) {
                    langs.add(lang);
                }
            });
        });
        return [...langs].sort();
    }, [allProjects, ready]);

    useEffect(() => {
        if (!ready || !initialLoadProcessedForLang.current.has(i18n.language)) return;

        const currentLang = i18n.language;
        const oldLang = sessionStorage.getItem(`${storagePrefix}PrevLangForFlip`);

        const defineTextKeysAndDefaults = () => {
            const keys = {
                pageTitle: { i18nKey: titleKey, defaultText: 'Projects' },
                filterAll: { i18nKey: 'projects.filterAll', defaultText: 'All' },
                filterIntegrations: { i18nKey: 'projects.filterIntegrations', defaultText: 'Integrations' },
                filterProgrammingLanguages: { i18nKey: 'projects.filterProgrammingLanguages', defaultText: 'Programming Languages' },
                filterAllIntegrations: { i18nKey: 'projects.filterAllIntegrations', defaultText: 'All Integrations' },
                noProjectsMessage: { i18nKey: 'projects.noProjectsToDisplay', defaultText: 'No projects match the selected filters.' },
                activeFiltersLabel: { i18nKey: 'projects.activeFilters', defaultText: 'Active filters:' },
            };
            MAIN_PROGRAMMING_LANGUAGES.forEach(lang => { keys[`lang_${lang}`] = { literal: lang }; });
            languagesForIntegrationViewButtons.forEach(lang => { const key = `lang_int_${lang}`; if (!keys[key]) { keys[key] = { literal: lang }; }});
            return keys;
        };

        const textKeysConfig = defineTextKeysAndDefaults();
        const languageChanged = oldLang && oldLang !== currentLang;
        const needsUpdate = languageChanged || Object.keys(flippableTexts).length === 0 || languagesForIntegrationViewButtons.some(lang => !flippableTexts[`lang_int_${lang}`]);

        if (needsUpdate) {
            const textsToUpdate = {};
            Object.entries(textKeysConfig).forEach(([stateKey, config]) => {
                const isLiteral = !!config.literal;
                const currentText = isLiteral ? config.literal : t(config.i18nKey, config.defaultText);
                let oldText = currentText;
                if (languageChanged && !isLiteral && oldLang) {
                    oldText = i18n.getFixedT(oldLang)(config.i18nKey, config.defaultText);
                }
                textsToUpdate[stateKey] = {
                    frontText: languageChanged && !isLiteral ? oldText : currentText,
                    backText: currentText,
                    isFlipped: languageChanged && !isLiteral,
                };
            });
            setFlippableTexts(prev => ({ ...prev, ...textsToUpdate }));
            if (languageChanged) {
                Object.keys(textsToUpdate).forEach((key, index) => {
                    if (textsToUpdate[key].isFlipped) {
                        setTimeout(() => {
                            setFlippableTexts(prev => prev[key] ? { ...prev, [key]: { ...prev[key], isFlipped: false, frontText: prev[key].backText } } : prev);
                        }, index * 50 + FLIP_ANIMATION_DURATION);
                    }
                });
            }
        }
        sessionStorage.setItem(`${storagePrefix}PrevLangForFlip`, currentLang);
    }, [i18n.language, ready, t, i18n, languagesForIntegrationViewButtons, allProjects, titleKey, storagePrefix]);

    useEffect(() => {
        if (!allProjects.length && ready === false) return;

        let projects = [];
        if (viewMode === 'language') {
            projects = activeMainFilter === 'all' ? allProjects : allProjects.filter(p => getProjectMainLanguages(p).includes(activeMainFilter));
        } else {
            const integrations = allProjects.filter(p => isIntegrationProject(p));
            projects = activeMainFilter === 'all_integrations' ? integrations : integrations.filter(p => getProjectMainLanguages(p).includes(activeMainFilter));
        }
        if (temporaryFilters.length > 0) {
            projects = projects.filter(project => temporaryFilters.every(filter => project.technologies?.includes(filter)));
        }
        setFilteredProjects(projects);
    }, [allProjects, viewMode, activeMainFilter, temporaryFilters, ready]);

    const handleMainFilterOrViewChange = (filterName) => {
        const isActiveInCurrentView =
            (viewMode === 'language' && activeMainFilter === filterName) ||
            (viewMode === 'integration' && activeMainFilter === filterName);
        setTemporaryFilters([]);
        if (filterName === 'integrations_view_trigger') {
            setViewMode('integration');
            setActiveMainFilter('all_integrations');
        } else if (filterName === 'languages_view_trigger') {
            setViewMode('language');
            setActiveMainFilter('all');
        } else {
            if (viewMode === 'language') {
                setActiveMainFilter(isActiveInCurrentView && filterName !== 'all' ? 'all' : filterName);
            } else {
                setActiveMainFilter(isActiveInCurrentView && filterName !== 'all_integrations' ? 'all_integrations' : filterName);
            }
        }
    };

    const handleTechnologyTagClick = (tech) => {
        if (MAIN_PROGRAMMING_LANGUAGES.includes(tech)) {
            setViewMode('language');
            setActiveMainFilter(prev => prev === tech ? 'all' : tech);
            setTemporaryFilters([]);
            return;
        }
        setTemporaryFilters(prev => {
            if (prev.includes(tech)) return prev.filter(t => t !== tech);
            return prev.length < MAX_TEMPORARY_FILTERS ? [...prev, tech] : prev;
        });
    };

    const removeTemporaryFilter = (filter) => {
        setTemporaryFilters(prev => prev.filter(f => f !== filter));
    };

    const renderFlippableContent = (textKey, defaultTextKeyOrLiteral = "", className = "") => {
        const isLiteralKey = MAIN_PROGRAMMING_LANGUAGES.includes(defaultTextKeyOrLiteral) || languagesForIntegrationViewButtons.includes(defaultTextKeyOrLiteral);
        const defaultTextLookup = isLiteralKey ? defaultTextKeyOrLiteral : t(defaultTextKeyOrLiteral, defaultTextKeyOrLiteral);

        const content = flippableTexts[textKey] || {
            frontText: defaultTextLookup,
            backText: defaultTextLookup,
            isFlipped: false
        };
        return (
            <FlippableText
                oldText={content.frontText}
                newText={content.backText}
                isFlipped={content.isFlipped}
                duration={FLIP_ANIMATION_DURATION}
                className={className || "inline-block"}
            />
        );
    };

    const titleContainerStyle = "inline-block transition-all duration-300 ease-out hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]";
    const baseFilterButtonStyle = "px-4 py-2 text-sm font-medium rounded-lg shadow transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-blue-500 focus:ring-opacity-75";
    const hoverStyle = "hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:-translate-y-[3px]";

    const getButtonClasses = (filterValue, isActive) => {
        const activeStyle = isActive
            ? "bg-blue-600 text-white shadow-lg -translate-y-[3px] dark:bg-blue-500"
            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";
        return `${baseFilterButtonStyle} ${activeStyle} ${!isActive ? hoverStyle : ''}`;
    };

    const specialButtonClasses = `${baseFilterButtonStyle} bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 ${hoverStyle}`;

    const renderFilterButtons = () => {
        if (viewMode === 'language') {
            return (
                <>
                    <button onClick={() => handleMainFilterOrViewChange('all')} className={getButtonClasses('all', activeMainFilter === 'all')} >
                        {renderFlippableContent('filterAll', 'projects.filterAll')}
                    </button>
                    {MAIN_PROGRAMMING_LANGUAGES.map(lang => (
                        <button key={lang} onClick={() => handleMainFilterOrViewChange(lang)} className={getButtonClasses(lang, activeMainFilter === lang)} >
                            {renderFlippableContent(`lang_${lang}`, lang)}
                        </button>
                    ))}
                    <button onClick={() => handleMainFilterOrViewChange('integrations_view_trigger')} className={specialButtonClasses} >
                        {renderFlippableContent('filterIntegrations', 'projects.filterIntegrations')}
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={() => handleMainFilterOrViewChange('languages_view_trigger')} className={specialButtonClasses} >
                        {renderFlippableContent('filterProgrammingLanguages', 'projects.filterProgrammingLanguages')}
                    </button>
                    <button onClick={() => handleMainFilterOrViewChange('all_integrations')} className={getButtonClasses('all_integrations', activeMainFilter === 'all_integrations')} >
                        {renderFlippableContent('filterAllIntegrations', 'projects.filterAllIntegrations')}
                    </button>
                    {languagesForIntegrationViewButtons.map(lang => (
                        <button key={`int-${lang}`} onClick={() => handleMainFilterOrViewChange(lang)} className={getButtonClasses(lang, activeMainFilter === lang)} >
                            {renderFlippableContent(`lang_int_${lang}`, lang)}
                        </button>
                    ))}
                </>
            );
        }
    };

    const renderTemporaryFilterBadges = () => {
        if (temporaryFilters.length === 0) return null;
        return (
            <div className="my-4 flex flex-wrap justify-center gap-2 items-center px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {renderFlippableContent('activeFiltersLabel', 'projects.activeFilters')}
                </span>
                {temporaryFilters.map(filter => (
                    <span key={filter} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                        {filter}
                        <button
                            onClick={() => removeTemporaryFilter(filter)}
                            className="ml-2 -mr-1 p-0.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                            aria-label={t('projects.removeFilter', { filter })}
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="mb-16">
            <div className="text-center mb-10">
                <div className={titleContainerStyle}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        {renderFlippableContent('pageTitle', titleKey)}
                    </h2>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                {renderFilterButtons()}
            </div>

            {renderTemporaryFilterBadges()}

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
            >
                <AnimatePresence initial={false} mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.7,
                                y: -30,
                                transition: { duration: CARD_ANIMATION_DURATION * 0.5 }
                            }}
                            transition={{
                                duration: CARD_ANIMATION_DURATION,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <ProjectCard
                                project={project}
                                onTechnologyTagClick={handleTechnologyTagClick}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && allProjects.length > 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
                    {renderFlippableContent('noProjectsMessage', 'projects.noProjectsToDisplay')}
                </p>
            )}
        </div>
    );
};

ProjectsSection.propTypes = {
    projectDataEN: PropTypes.array.isRequired,
    projectDataES: PropTypes.array.isRequired,
    titleKey: PropTypes.string.isRequired,
    storagePrefix: PropTypes.string.isRequired
};

export default ProjectsSection;

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FlippableText from '../components/FlippableText';


const ANIMATION_DURATION = 600;

const About = () => {
    const { t, i18n, ready } = useTranslation();

    const [flippableTexts, setFlippableTexts] = useState({});
    const prevLangRef = useRef(i18n.language);
    const initialLoadDoneRef = useRef(false);

    const textKeysConfig = {
        pageTitle: { i18nKey: 'about.pageTitle', defaultText: 'Acerca de Mí' },
        introSectionTitle: { i18nKey: 'about.introSectionTitle', defaultText: 'Mi Pasión por la Tecnología y la Ingeniería' },
        introParagraph1: { i18nKey: 'about.introParagraph1', defaultText: 'Desde joven, siempre me sentí atraído por entender cómo funcionan las cosas...' },
        introParagraph2: { i18nKey: 'about.introParagraph2', defaultText: 'Mi formación como Ingeniero Mecatrónico me proporcionó una base sólida...' },
        journeySectionTitle: { i18nKey: 'about.journeySectionTitle', defaultText: 'Mi Trayectoria Profesional' },
        journeyParagraph1: { i18nKey: 'about.journeyParagraph1', defaultText: 'He tenido la oportunidad de trabajar en diversos proyectos desafiantes...' },
        philosophySectionTitle: { i18nKey: 'about.philosophySectionTitle', defaultText: 'Mi Filosofía y Enfoque' },
        philosophyParagraph1: { i18nKey: 'about.philosophyParagraph1', defaultText: 'Creo firmemente en la mejora continua y en el poder de la tecnología para resolver problemas complejos...' },
        connectSectionTitle: { i18nKey: 'about.connectSectionTitle', defaultText: 'Conectemos' },
        connectParagraph: { i18nKey: 'about.connectParagraph', defaultText: 'Si mi perfil te resulta interesante o si crees que podríamos colaborar, no dudes en contactarme.' },
        linkedinLinkText: { i18nKey: 'about.linkedinLinkText', defaultText: 'LinkedIn' },
        githubLinkText: { i18nKey: 'about.githubLinkText', defaultText: 'GitHub' },
    };

    useEffect(() => {
        if (!ready) return;

        const currentLang = i18n.language;
        const oldLang = prevLangRef.current;
        const isActualLanguageChange = initialLoadDoneRef.current && oldLang !== null && oldLang !== currentLang;

        const textsToUpdate = {};
        Object.entries(textKeysConfig).forEach(([stateKey, config]) => {
            const currentTextValue = t(config.i18nKey, config.defaultText);
            let oldTextForFlip = currentTextValue;

            if (isActualLanguageChange) {
                oldTextForFlip = i18n.getFixedT(oldLang)(config.i18nKey, config.defaultText);
            }

            textsToUpdate[stateKey] = {
                frontText: isActualLanguageChange ? oldTextForFlip : currentTextValue,
                backText: currentTextValue,
                isFlipped: isActualLanguageChange,
            };
        });

        setFlippableTexts(prev => ({ ...prev, ...textsToUpdate }));

        if (isActualLanguageChange) {
            Object.keys(textsToUpdate).forEach((key, index) => {
                const staggerDelay = index * 50;
                setTimeout(() => {
                    setFlippableTexts(prev => {
                        if (!prev[key]) return prev;
                        return {
                            ...prev,
                            [key]: { ...prev[key], isFlipped: false, frontText: prev[key].backText },
                        };
                    });
                }, staggerDelay + ANIMATION_DURATION);
            });
        }

        if (!initialLoadDoneRef.current) initialLoadDoneRef.current = true;
        prevLangRef.current = currentLang;

    }, [i18n.language, ready, t, i18n]);

    const renderFlippableContent = (textKey, elementType = 'p', className = "") => {
        const props = flippableTexts[textKey];
        const Tag = elementType;

        if (!props || props.frontText === undefined) {
            const config = textKeysConfig[textKey];
            return <Tag className={className}>{t(config?.i18nKey, config?.defaultText || '')}</Tag>;
        }

        return (
            <FlippableText
                oldText={<Tag className={className}>{props.frontText}</Tag>}
                newText={<Tag className={className}>{props.backText}</Tag>}
                isFlipped={props.isFlipped}
                duration={ANIMATION_DURATION}
                className="inline-block"
            />
        );
    };

    const GITHUB_URL = "https://github.com/John-Fajardo-Calle";
    const LINKEDIN_URL = "https://www.linkedin.com/in/john-paul-martin-fajardo-calle-92202031b/";

    return (
        <div className="container mx-auto px-4 py-12 sm:py-16">
            <header className="text-center mb-12 md:mb-16">
                {renderFlippableContent('pageTitle', 'h1', "text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white")}
            </header>

            <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
                <section>
                    {renderFlippableContent('introSectionTitle', 'h2', "text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4")}

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        {renderFlippableContent('introParagraph1', 'p')}
                        {renderFlippableContent('introParagraph2', 'p')}
                    </div>
                </section>

                <section>
                    {renderFlippableContent('journeySectionTitle', 'h2', "text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4")}
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        {renderFlippableContent('journeyParagraph1', 'p')}
                    </div>
                </section>

                <section>
                    {renderFlippableContent('philosophySectionTitle', 'h2', "text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4")}
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        {renderFlippableContent('philosophyParagraph1', 'p')}
                    </div>
                </section>

                <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-10 mt-10">
                    {renderFlippableContent('connectSectionTitle', 'h2', "text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4")}
                    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-6 text-gray-700 dark:text-gray-300">
                        {renderFlippableContent('connectParagraph', 'p')}
                    </div>
                    <div className="flex justify-center space-x-6">
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 text-lg font-medium"
                        >
                            {renderFlippableContent('linkedinLinkText', 'span')}
                        </a>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 text-lg font-medium"
                        >
                            {renderFlippableContent('githubLinkText', 'span')}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
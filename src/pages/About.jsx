import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FadingText from '../components/FadingText';

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

    // Aquí SOLO FadingText para el contenido, NO para el bloque h1/h2/p
    const renderFlippableText = (textKey, className = "") => {
        const props = flippableTexts[textKey];
        if (!props || props.frontText === undefined) {
            const config = textKeysConfig[textKey];
            return t(config?.i18nKey, config?.defaultText || '');
        }
        return (
            <FadingText
                oldText={props.frontText}
                newText={props.backText}
                isFlipped={props.isFlipped}
                duration={ANIMATION_DURATION}
                className={className}
                mode="block" // <-- CLAVE PARA ABOUT, todo animado en flujo normal
            />
        );
    };

    const GITHUB_URL = "https://github.com/John-Fajardo-Calle";
    const LINKEDIN_URL = "https://www.linkedin.com/in/john-paul-martin-fajardo-calle-92202031b/";

    return (
        <div className="container mx-auto px-4 py-12 sm:py-16">
            <header className="text-center mb-12 md:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white">
                    {renderFlippableText('pageTitle')}
                </h1>
            </header>

            <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
                <section>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        {renderFlippableText('introSectionTitle')}
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        <p>{renderFlippableText('introParagraph1')}</p>
                        <p>{renderFlippableText('introParagraph2')}</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        {renderFlippableText('journeySectionTitle')}
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        <p>{renderFlippableText('journeyParagraph1')}</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        {renderFlippableText('philosophySectionTitle')}
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                        <p>{renderFlippableText('philosophyParagraph1')}</p>
                    </div>
                </section>

                <section className="text-center border-t border-gray-200 dark:border-gray-700 pt-10 mt-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                        {renderFlippableText('connectSectionTitle')}
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-6 text-gray-700 dark:text-gray-300">
                        <p>{renderFlippableText('connectParagraph')}</p>
                    </div>
                    <div className="flex justify-center space-x-6">
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 text-lg font-medium"
                        >
                            {renderFlippableText('linkedinLinkText', 'inline-block')}
                        </a>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 text-lg font-medium"
                        >
                            {renderFlippableText('githubLinkText', 'inline-block')}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;

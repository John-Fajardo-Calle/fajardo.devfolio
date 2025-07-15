import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FadingText from "../components/FadingText";

const TRANSLATION_KEYS = {
    GREETING: 'home.greeting',
    INTRODUCTION: 'home.introduction',
    VIEW_PROJECTS: 'home.viewProjects',
    CONTACT_ME: 'home.contactMe',
};

const ANIMATION_DURATION = 600;
const STAGGER_DELAY = 150;

const Home = () => {
    const { t, i18n } = useTranslation();
    const [textElementsProps, setTextElementsProps] = useState(() => {
        const initialProps = {};
        Object.values(TRANSLATION_KEYS).forEach(key => {
            initialProps[key] = {
                frontText: '',
                backText: '',
                isFlipped: false,
            };
        });
        return initialProps;
    });

    const prevLangRef = useRef(i18n.language);
    const isInitialMountRef = useRef(true);

    useEffect(() => {
        const currentLang = i18n.language;
        const oldLang = prevLangRef.current;

        setTextElementsProps(prevProps => {
            const newPropsState = { ...prevProps };
            let hasLanguageChanged = oldLang !== currentLang;

            if (isInitialMountRef.current || hasLanguageChanged) {

                Object.values(TRANSLATION_KEYS).forEach(key => {
                    const currentTextInNewLang = t(key);

                    if (isInitialMountRef.current) {
                        newPropsState[key] = {
                            ...prevProps[key],
                            frontText: currentTextInNewLang,
                            backText: currentTextInNewLang,
                            isFlipped: false,
                        };
                    } else if (hasLanguageChanged) {
                        newPropsState[key] = {
                            ...prevProps[key],
                            frontText: i18n.getFixedT(oldLang)(key),
                            backText: currentTextInNewLang,
                            isFlipped: true,
                        };
                    }
                });
                if (isInitialMountRef.current) {
                    isInitialMountRef.current = false;
                }
            }
            return newPropsState;
        });

        if (oldLang !== currentLang && !isInitialMountRef.current) {
            Object.values(TRANSLATION_KEYS).forEach((key, index) => {
                const delay = index * STAGGER_DELAY;

                setTimeout(() => {
                    setTextElementsProps(prev => {
                        if (!prev[key]) return prev;

                        return {
                            ...prev,
                            [key]: {
                                ...prev[key],
                                isFlipped: false,
                                frontText: prev[key].backText,
                            },
                        };
                    });
                }, delay + ANIMATION_DURATION);
            });
            prevLangRef.current = currentLang;
        } else {
            prevLangRef.current = currentLang;
        }
    }, [i18n.language, t, i18n]);

    const renderFlippableText = (textKey, defaultClasses = "") => {
        const props = textElementsProps[textKey];
        if (!props || props.frontText === undefined) {
            return t(textKey);
        }
        return (
            <FadingText
                oldText={props.frontText}
                newText={props.backText}
                isFlipped={props.isFlipped}
                duration={ANIMATION_DURATION}
                className={defaultClasses}
                mode="block"
            />
        );
    };

    return (
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
                    {renderFlippableText(TRANSLATION_KEYS.GREETING)}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 px-4">
                    {renderFlippableText(TRANSLATION_KEYS.INTRODUCTION)}
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link
                        to="/projects"
                        className="px-8 py-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg
                                   text-blue-700 dark:text-white
                                   [background-image:radial-gradient(ellipse_at_center,theme(colors.blue.200)0%,theme(colors.blue.300)50%,theme(colors.blue.400)100%)]
                                   hover:[background-image:radial-gradient(ellipse_at_center,theme(colors.blue.300)0%,theme(colors.blue.400)50%,theme(colors.blue.500)100%)]
                                   dark:[background-image:radial-gradient(ellipse_at_center,theme(colors.blue.400)0%,theme(colors.blue.600)50%,theme(colors.blue.800)100%)]
                                   dark:hover:[background-image:radial-gradient(ellipse_at_center,theme(colors.blue.500)0%,theme(colors.blue.700)50%,theme(colors.blue.900)100%)]"
                    >
                        {renderFlippableText(TRANSLATION_KEYS.VIEW_PROJECTS)}
                    </Link>

                    <Link
                        to="/contact"
                        className="px-8 py-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-lg
                                   text-gray-700 dark:text-blue-700
                                   [background-image:radial-gradient(ellipse_at_center,theme(colors.gray.100)0%,theme(colors.gray.200)50%,theme(colors.gray.300)100%)]
                                   hover:[background-image:radial-gradient(ellipse_at_center,theme(colors.gray.200)0%,theme(colors.gray.300)50%,theme(colors.gray.400)100%)]
                                   dark:[background-image:radial-gradient(ellipse_at_center,theme(colors.gray.400)0%,theme(colors.gray.600)50%,theme(colors.gray.800)100%)]
                                   dark:hover:[background-image:radial-gradient(ellipse_at_center,theme(colors.gray.300)0%,theme(colors.gray.500)50%,theme(colors.gray.700)100%)]"
                    >
                        {renderFlippableText(TRANSLATION_KEYS.CONTACT_ME)}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
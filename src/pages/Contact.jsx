import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FadingText from '../components/FadingText';
import ContactForm from '../components/ContactForm';

const ANIMATION_DURATION = 600;

const Contact = () => {
    const { t, i18n, ready } = useTranslation();


    const [flippableTexts, setFlippableTexts] = useState({});
    const prevLangRef = useRef(i18n.language);
    const initialLoadDoneRef = useRef(false);

    const WHATSAPP_NUMBER = "932137302";

    const whatsappMessage = useMemo(() => {
        return t('contact.whatsappMessageDefault', "Hola John, me gustaría ponerme en contacto contigo.");
    }, [i18n.language, t]);

    const WHATSAPP_LINK = useMemo(() => {
        const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
        return link;
    }, [WHATSAPP_NUMBER, whatsappMessage]);

    const textKeysConfig = {
        pageTitle: { i18nKey: 'contact.pageTitle', defaultText: 'Contacto' },
        introText: { i18nKey: 'contact.introText', defaultText: '¡Hablemos! Si tienes alguna pregunta, propuesta o simplemente quieres saludar, no dudes en enviarme un mensaje.' },
        formSectionTitle: { i18nKey: 'contact.formSectionTitle', defaultText: 'Envíame un Mensaje' },
        whatsappButtonText: { i18nKey: 'contact.whatsappButtonText', defaultText: 'Contactar por WhatsApp' },
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
            <FadingText
                oldText={<Tag className={className}>{props.frontText}</Tag>}
                newText={<Tag className={className}>{props.backText}</Tag>}
                isFlipped={props.isFlipped}
                duration={ANIMATION_DURATION}
                className="block"
                mode="block"
            />
        );
    };

    return (
        <div className="container mx-auto px-4 py-12 sm:py-16">
            <header className="text-center mb-10 md:mb-12">
                {renderFlippableContent('pageTitle', 'h1', "text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white")}
            </header>

            <div className="max-w-3xl mx-auto">
                <div className="text-center text-lg text-gray-700 dark:text-gray-300 mb-10 md:mb-12">
                    {renderFlippableContent('introText', 'p')}
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6 text-center">
                        {renderFlippableContent('formSectionTitle', 'span')}
                    </h2>
                    <ContactForm />
                </section>

                <div className="flex items-center justify-center my-8 md:my-10">
                    <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400">O</span>
                    <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                </div>

                <section className="text-center">
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-[1cm] py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-lg"
                    >
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        {renderFlippableContent('whatsappButtonText', 'span')}
                    </a>
                </section>
            </div>
        </div>
    );
};

export default Contact;
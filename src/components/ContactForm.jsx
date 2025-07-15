import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendEmail } from '../services/email';


const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('contact.form.errors.nameRequired', 'El nombre es obligatorio.');
        if (!formData.email.trim()) {
            newErrors.email = t('contact.form.errors.emailRequired', 'El correo electrónico es obligatorio.');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contact.form.errors.emailInvalid', 'El formato del correo no es válido.');
        }
        if (!formData.message.trim()) newErrors.message = t('contact.form.errors.messageRequired', 'El mensaje es obligatorio.');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('');
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const templateParams = {
            visitor_name: formData.name,
            visitor_email: formData.email,
            visitor_message: formData.message
        };

        console.log('Enviando a EmailJS con estos templateParams (estandarizados):', templateParams);

        try {
            await sendEmail(templateParams);

            console.log('Mensaje enviado con éxito a través de EmailJS!');
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error al enviar el mensaje con EmailJS:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {t('contact.form.nameLabel', 'Nombre Completo')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'
                        }`}
                        placeholder={t('contact.form.namePlaceholder', 'Ej: John Fajardo')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {t('contact.form.emailLabel', 'Correo Electrónico')}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'
                        }`}
                        placeholder={t('contact.form.emailPlaceholder', 'tu@correo.com')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {t('contact.form.messageLabel', 'Tu Mensaje')}
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                            errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'
                        }`}
                        placeholder={t('contact.form.messagePlaceholder', 'Escribe aquí tu consulta o propuesta...')}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        disabled={isSubmitting}
                    ></textarea>
                    {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? t('contact.form.sendingButton', 'Enviando...')
                            : t('contact.form.sendButton', 'Enviar Mensaje')
                        }
                    </button>
                </div>

                {submitStatus === 'success' && (
                    <p className="mt-4 text-center text-green-600 dark:text-green-400">
                        {t('contact.form.successMessage', '¡Mensaje enviado con éxito! Gracias por contactarme.')}
                    </p>
                )}
                {submitStatus === 'error' && (
                    <p className="mt-4 text-center text-red-600 dark:text-red-400">
                        {t('contact.form.errorMessage', 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame por WhatsApp.')}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
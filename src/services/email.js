import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

export const sendEmail = (templateParams) => {

    console.log('Enviando correo con los siguientes parámetros:', templateParams);
    console.log('Usando Service ID:', SERVICE_ID, 'Template ID:', TEMPLATE_ID, 'User ID:', USER_ID);


    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
};
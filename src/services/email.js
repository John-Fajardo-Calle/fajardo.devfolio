import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_xvweu6j';
const TEMPLATE_ID = 'template_5obxpes';
const USER_ID = 'y9CrMWmUZdvrLDvRw';


export const sendEmail = (templateParams) => {

    console.log('Enviando correo con los siguientes parámetros:', templateParams);
    console.log('Usando Service ID:', SERVICE_ID, 'Template ID:', TEMPLATE_ID, 'User ID:', USER_ID);


    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
};
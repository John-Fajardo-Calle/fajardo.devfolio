import emailjs from 'emailjs-com'

export function sendContactForm(data) {
    return emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        data,
        'YOUR_USER_ID'
    )
}

const sgMail = require('@sendgrid/mail')

//const sendgridAPIKey = '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'
 
// sgMail.setApiKey(sendgridAPIKey)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.send({
//     to: 'abhishekvats010.av@gmail.com',
//     from: 'abhishekvats010.av@gmail.com',
//     subject: 'This is my first email from sendgrid',
//     text: 'Hello world.'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhishekvats010.av@gmail.com',
        subject: 'Welcome to Task App',
        text: `Welcome, ${name} to the app. How can we help you `
    })
}

const sendCanceltionEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhishekvats010.av@gmail.com',
        subject: 'Cancelation of the email',
        text: `Hi ${name} this mail is to confirm the cancelation process. If anything you want to suggest which you want to change in the site would be helpful.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCanceltionEmail
}
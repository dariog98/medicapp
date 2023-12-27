import nodemailer from 'nodemailer'

const user = process.env.MAIL_USERNAME
const pass = process.env.MAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
})

const sendMail = async (mail, password) => {
    const body = `
        <h3>Hello ${mail}</h3>
        <p>Esta es tu nueva contraseña:</p>
        <h1>${password}</h1>
    `

    const message = await transporter.sendMail({
        from: `"MedicApp" <medic@example.com>`,
        to: mail,
        subject: 'Contraseña cambiada',
        html: body,
    })

    console.log('Message sent: %s', message)
}

export { sendMail }
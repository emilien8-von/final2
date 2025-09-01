// Dans services/mail.js
const nodemailer = require('nodemailer');
const ENV = require('../config/env');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
    }
});

/**
 * @param {string} to - 
 * @param {string} subject - 
 * @param {string} html - 
 */
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Alpha Gaming" <${ENV.EMAIL_USER}>`, 
            to: to,
            subject: subject,
            html: html
        });
        console.log(`Email envoyé avec succès à ${to}`);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${to}:`, error);
        throw new Error("Erreur lors de l'envoi de l'email.");
    }
};
const sendVerificationEmail = async (userEmail, userPseudo, verificationToken) => {
    
    const emailHTML = `
        <h3>Bonjour ${userPseudo},</h3>
        <p>Merci pour votre inscription ! Nous espèreront que vous allez prendre du plasir à consulter nos différents jeux !</p>
    `;

    await sendEmail(userEmail, "Validez votre inscription sur Alpha Gaming", emailHTML);
};

const createResetCodeEmailHTML = (pseudo, resetCode) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #501794;">Code de validation Alpha Gaming</h2>
            <p>Bonjour ${pseudo},</p>
            <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Votre code de validation est :</p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; background-color: #f2f2f2; padding: 10px; margin: 20px 0; letter-spacing: 5px;">
                ${resetCode}
            </div>
            <p>Ce code expirera dans 10 minutes.</p>
            <p>Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email en toute sécurité.</p>
            <hr style="border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 0.8em; color: #777;">L'équipe Alpha Gaming</p>
        </div>
    `;
};

module.exports = { sendEmail,sendVerificationEmail, createResetCodeEmailHTML };
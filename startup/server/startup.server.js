import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL = "smtp://postmaster@sandbox66e409414c57457a89c761371c92837d.mailgun.org:326c4ad217e81eb81e2e1abccfa603a2@smtp.mailgun.org:587";
    // process.env.MAIL_URL = "smtp://siddhchakragujar@gmail.com:sidhchakra_gujar_003@smtp.gmail.com:587";

    Accounts.config({ sendVerificationEmail: true});
    
    Accounts.emailTemplates.siteName = "ShareMe!";
    Accounts.emailTemplates.from = "ShareMe! <support@shareme.com>";
    Accounts.emailTemplates.verifyEmail = {
        subject() {
            return "ShareMe! Verify Your Email Address";
        },
        text(user, url) {
            var emailAddress = user.emails[0].address,
                urlWithoutHash = url.replace('#/', ''),
                supportEmail = "support@shareme.com",
                emailBody = `To verify your email address (${emailAddress}) click the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

            return emailBody;
        }
    };
});
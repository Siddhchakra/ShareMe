import '/imports/ui/pages/register.html';
import '/imports/ui/pages/home.html';
import '/imports/ui/pages/login.html';
import '/client/main.html';

//#region Routing
Router.route('/', function () {
    BlazeLayout.render('App_body', { main: 'login' })
});

Router.route('/verify-email/:token', function () {
    // this.render("email_verified");
    var token;

    token = this.originalUrl.split("/verify-email/")[1];

    Accounts.verifyEmail(token, function (err, res) {
        console.log("Err: " + err);
        console.log("Res: " + res);
    });
});
//#end region

//#region Verify email

//#end region

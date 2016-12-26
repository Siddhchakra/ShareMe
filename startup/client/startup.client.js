import '/imports/ui/pages/register.html';
import '/imports/ui/pages/home.html';
import '/imports/ui/pages/login.html';
import '/client/main.html';

//#region Routing
Router.route('/', function () {
    BlazeLayout.render('App_body', { main: 'home' })
});

Router.route('/verify-email/:token', function () {
    var token;

    token = this.params.token;

    Accounts.verifyEmail(token, function (err, res) {
        console.log("Error: " + err);
    });

    Router.go("/");
});
//#end region

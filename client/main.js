import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import HTML files
import './main.html';
import '/imports/ui/pages/emailverified.html';
import '/imports/ui/pages/register.html';
import '/imports/ui/pages/login.html';
import '/imports/ui/pages/home.html';
import '/imports/ui/pages/dashboard.html';

//import JS files
import { MessagePhrases } from '/imports/common/messagePhrases.js';

//Register Template
Template.register.events({
  "click .sign-up": function (event) {
    var firstName;
    var lastName;
    var emailId;
    var password;
    var methodArguments;

    methodArguments = {};
    methodArguments.emailId = $('[name=email]').val();
    methodArguments.password = $('[name=password]').val();
    methodArguments.firstName = $('[name=firstname]').val();
    methodArguments.lastName = $('[name=lastname]').val();


    Meteor.call("createNewUser", methodArguments, function (err, res) {
      console.log(err);
    });
  },

  "click .sign-in": function (event) {
    BlazeLayout.render('App_body', { main: 'login' });
  }
});
//End

//Login Template
Template.login.events({
  "click .sign-in": function (event) {
    var emailId;
    var password;
    var userDetails;

    emailId = $('[name=email]').val();
    password = $('[name=password]').val();

    Meteor.call("checkLoginEmailId", emailId, function (err, res) {
      if (res) {
        Meteor.loginWithPassword(emailId, password, function (err) {
          if (!err) {
            BlazeLayout.render('App_body', { main: 'home' });
          } else {
            console.log("Error: " + err);
          }
        });
      } else {
        $('.loginmsg').text('Please verify your email-id..');
      }
    });
  },

  "click .sign-up": function (event) {
    BlazeLayout.render('App_body', { main: 'register' });
  }
});
//End

//Home Template
Template.home.events({
  "click .logout": function (event) {
    Meteor.logout(function (err) {
      if (!err) {
        // Materialize.toast('You are logged out', 3000, 'rounded logged-out-toast');
      }
      else {
        console.log(err);
      }
    });
  }
});
//End
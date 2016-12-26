import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import HTML files
import './main.html';
import '/imports/ui/pages/emailverified.html';
import '/imports/ui/pages/register.html';
import '/imports/ui/pages/login.html';
import '/imports/ui/pages/home.html';

//import JS files
import { MessagePhrases } from '/imports/common/messagePhrases.js';

//Register Template
Template.register.events({
  "click .sign-up": function (event) {
    var emailId;
    var password;

    emailId = $('[name=email]').val();
    password = $('[name=password]').val();

    Meteor.call("createNewUser", emailId, password, function (err, res) {
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
        Meteor.loginWithPassword(emailId, password);
        BlazeLayout.render('App_body', { main: 'home' });
      } else {
        $('.loginmsg').val(MessagePhrases.loginValidationMessage);
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
    Meteor.logout();
  }
});
//End
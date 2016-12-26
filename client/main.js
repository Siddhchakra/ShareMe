import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/imports/ui/pages/emailverified.html';
import '/imports/ui/pages/register.html';
import '/imports/ui/pages/login.html';

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

    userDetails = Meteor.subscribe('userDetails', emailId, function(res, err, et){
      console.log(res + err + et);
    });

    console.log(userDetails);
  },

  "click .sign-up": function (event) {
    BlazeLayout.render('App_body', { main: 'register' });
  }
});
//End
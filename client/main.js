import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import HTML files
import '/imports/ui/js/pages.js';

//import JS files
import { MessagePhrases } from '/imports/common/messagePhrases.js';

//Publish collection
Friends = new Meteor.Collection('friendsCollection');

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

//Dashboard Template
Template.dashboard.events({
  "click .user-options .collection-item": function (event, template) {
    var user_option;

    $('.user-options .collection-item.active').removeClass('opacity-1');
    $('.user-options .collection-item.active').removeClass('active');

    $('.user-option').addClass('hide');

    user_option = event.toElement.childNodes[0].className;

    switch (user_option) {
      case "timeline":
        break;
      case "friends":
        // Router.go('Friends');
        $('.user-option.friends-list').removeClass('hide');
        break;
      case "profile":
        $('.user-option.profile-section').removeClass('hide');
        break;
    }

    event.toElement.classList.add('active');
    event.toElement.classList.add('opacity-1');
  },

  "change .profile-pic-file": function (event, template) {
    var file;
    var reader;

    file = event.target.files[0]; //assuming 1 file only

    if (!file) return;

    reader = new FileReader(); //create a reader according to HTML5 File API
    reader.readAsArrayBuffer(file); //read the file as arraybuffer

    reader.onload = function (event) {
      var serverArgs;
      var buffer;

      buffer = new Uint8Array(reader.result) // convert to binary

      serverArgs = {};
      serverArgs.userId = Meteor.userId();
      serverArgs.binaryImage = buffer;

      Meteor.call("setProfilePic", serverArgs, function (err, res) {
        console.log(res);
      });
    }
  }
});

Template.dashboard.onRendered(function () {
  //Displaying Timeline section as default when page is loaded
  $('.user-options .collection-item')[0].click();
});

Template.dashboard.helpers({
  friendsCollection: function () {
    Meteor.subscribe('friendsList');

    return Friends.find().fetch();
  },
});
//End
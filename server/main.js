import { Meteor } from 'meteor/meteor';

//#region Meteor Publish
//#end region


//#region Methods
Meteor.methods({
  createNewUser(emailId, password) {
    var userId;

    //Sign-up a user with email by creating new user in Users DB
    userId = Accounts.createUser({
      email: emailId,
      password: password
    });

    //Send email-id verification mail right after creating new user.
    Accounts.sendVerificationEmail(userId);

    //Forbid auto login unless email is verified.
    Accounts.validateLoginAttempt(false);
  }
});
//#end region
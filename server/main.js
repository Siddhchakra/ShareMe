import { Meteor } from 'meteor/meteor';

//#region Meteor Publish
//#end region


//#region Methods
Meteor.methods({
  createNewUser(args) {
    var userId;

    //Sign-up a user with email by creating new user in Users DB
    userId = Accounts.createUser({
      email: args.emailId,
      password: args.password,
      profile: {
        firstName: args.firstName,
        lastName: args.lastName
      }
    });

    //Send email-id verification mail right after creating new user.
    Accounts.sendVerificationEmail(userId);
  },

  checkLoginEmailId(emailId){
    var emailIdDetails;

    emailIdDetails = Meteor.users.findOne({emails: {$elemMatch:{address: emailId}}},
                                          {emails: []});

    return emailIdDetails.emails[0].verified;
  }
});
//#end region
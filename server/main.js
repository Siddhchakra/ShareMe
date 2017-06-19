import { Meteor } from 'meteor/meteor';
import { Friends } from '/models/tables/usersFriendsCollection';
import { ProfilePicCollection } from '/models/tables/usersProfilePicturesCollection';

//#region Meteor Publish
Meteor.publish('friendsList', function () {
  var self = this;
  var handle = Meteor.users.find({ _id: { $ne: this.userId },
                                   emails: { $elemMatch: { verified: true } }}).observeChanges({
    added: function (id, fields) {
      self.added('friendsCollection', id, fields);
    },
    changed: function (id, fields) {
      self.changed('friendsCollection', id, fields);
    },
    removed: function (id) {
      self.removed('friendsCollection', id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});
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
    // Accounts.sendVerificationEmail(userId);
  },

  //Check whether email-id verified before login
  checkLoginEmailId(emailId) {
    var emailIdDetails;

    emailIdDetails = Meteor.users.findOne({ emails: { $elemMatch: { address: emailId } } },
                                          { emails: [] });

    return emailIdDetails.emails[0].verified;
  },

  //Save profile pic
  setProfilePic(args) {
    return ProfilePicCollection.insert({userId: args.userId,
                                        profileImage: args.binaryImage,
                                        createdAt: new Date(),
                                        updatedAt: new Date()});
  }
});
//#end region
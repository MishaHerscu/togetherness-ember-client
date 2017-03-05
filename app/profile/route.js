import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),

  model () {
    return this.get('store').findRecord('user', this.get('credentials.id'))
    .then((user) => {
      return Ember.RSVP.hash({
        user: user,
        friends: this.get('store').findAll('friendship')
        .then((friendships) => {
          return friendships.filter((friendship) => {
            return (friendship.user === user) || (friendship.requestedUser === user);
          });
        }),
        awaitingApproval: this.get('store').findAll('friend_request')
        .then((requests) => {
          return requests.filter((request) => {
            return String(request.get('requestedUser.id')) === String(this.get('credentials.id'));
          });
        }),
        pendingRequests: this.get('store').findAll('friend_request')
        .then((requests) => {
          return requests.filter((request) => {
            return String(request.get('user.id')) === String(this.get('credentials.id'));
          });
        })
      });
    });
  },

  actions: {
    removeFriend (userId) {
      this.get('store').findAll('friendships')
      .then((friendships) => {
        friendships.forEach((friendship) => {
          friendship.get('user')
          .then((fUser) => {
            friendship.get('requestedUser')
            .then((rUser) => {
              if ((userId === fUser) || (userId === rUser)) {
                friendship.destroyRecord()
                .then(() => {
                  this.refresh();
                });
              }
            });
          });
        });
      });
    },
    cancelRequest (userId) {
      this.get('store').findAll('friend-request')
      .then((requests) => {
        requests.forEach((request) => {
          request.get('requestedUser')
          .then((requestedUser) => {
            if (requestedUser.id === userId) {
              request.destroyRecord()
              .then(() => {
                this.refresh();
              });
            }
          });
        });
      });
    },
    acceptRequest (userId) {
      this.get('store').findRecord('user', this.get('credentials.id'))
      .then((selfUser) => {
        this.get('store').findRecord('user', userId)
        .then((requestingUser) => {
          let newFriendshipData = {
            user: requestingUser,
            requestedUser: selfUser
          };
          if (newFriendshipData.user.id !== newFriendshipData.requestedUser.id) {
            let newFriendship = this.get('store').createRecord('friendship', newFriendshipData);
            newFriendship.save()
            .then(() => {
              this.refresh();
            });
          } else {
            this.get('flashMessages').warning('You cannot friend yourself.');
          }
        })
        .then((userId) => {
          this.send('declineRequest', userId);
        });
      });
    },
    declineRequest (userId) {
      this.get('store').findAll('friend-request')
      .then((requests) => {
        requests.forEach((request) => {
          request.get('user')
          .then((rUser) => {
            if (rUser.id === userId) {
              request.destroyRecord()
              .then(() => {
                this.refresh();
              });
            }
          });
        });
      });
    },
    unRequestFriend (userId) {
      this.get('store').findAll('friend-request')
      .then((requests) => {
        requests.forEach((request) => {
          request.get('requestedUser')
          .then((requestedUser) => {
            if (requestedUser.id === userId) {
              request.destroyRecord()
              .then(() => {
                this.refresh();
              });
            }
          });
        });
      });
    },
    changePassword () {
      this.transitionTo('change-password');
    },
    editProfile () {
      this.transitionTo('profile/edit');
    },
    deleteProfile () {
      this.transitionTo('profile/delete');
    }
  },
});

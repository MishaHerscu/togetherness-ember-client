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
    removeFriend () {
      console.log('removeFriend triggered!');
    },
    cancelRequest () {
      console.log('cancelRequest triggered!');
    },
    acceptRequest () {
      console.log('acceptRequest triggered!');
    },
    declineRequest () {
      console.log('declineRequest triggered!');
    },
    unRequestFriend(){
      console.log('unrequest');
    },
    editProfile () {
      this.transitionTo('profile/edit');
    },
    deleteProfile () {
      this.transitionTo('profile/delete');
    }
  },
});

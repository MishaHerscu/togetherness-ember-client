import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),

  model () {
    // return this.get('credentials').content;
    return this.get('store').findRecord('user', this.get('credentials.id'))
    .then((user) => {
      user.set('friends', user.get('friendships').toArray());
      user.set('requests', user.get('friend_requests').toArray());
      return user;
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
    editProfile () {
      this.transitionTo('profile/edit');
    },
    deleteProfile () {
      this.transitionTo('profile/delete');
    }
  },
});

import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  credentials: storageFor('auth'),
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  model () {
    return this.get('store').findAll('user');
  },

  actions: {
    requestFriend(user) {

      let requestObject = {
        user: this.get('store').findRecord('user', this.get('credentials.id')),
        requestedUser: ''
      };

      this.get('store').findRecord('user', user)
      .then((user) => {
        requestObject.requestedUser = user;
        return requestObject;
      })
      .then(() => {
        if (requestObject.user.id !== requestObject.requestedUser.id) {
          let newFriendRequest = this.get('store').createRecord('friend-request', requestObject);
          newFriendRequest.save();
        } else {
          this.get('flashMessages').warning('You cannot friend yourself.');
        }
      });
    }
  }
});

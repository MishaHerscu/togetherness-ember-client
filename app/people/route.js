import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  credentials: storageFor('auth'),

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
        let newFriendRequest = this.get('store').createRecord('friend-request', requestObject);
        newFriendRequest.save();
      });
    }
  }
});

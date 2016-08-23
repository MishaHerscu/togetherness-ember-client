import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  credentials: storageFor('auth'),
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  model () {
    return this.get('store').findAll('user')
    .then((users) => {
      users.forEach((user) => {
        user.set('self', String(user.id) === String(this.get('credentials.id')));
      });
      return users;
    })
    .then((users) => {
      this.get('store').findAll('friend-request')
      .then((requests) => {
        users.forEach((user) => {
          user.set('requested', false);
          requests.forEach((request) => {
            if(String(request.get('requestedUser.id')) === String(user.id)) {
              user.set('requested', true);
            }
          });
        });
      });
      return users;
    });
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
    },
    viewProfile(){
      this.transitionTo('profile');
    },
  }
});

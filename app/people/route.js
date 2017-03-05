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
    requestFriend(requestedUser) {
      this.get('store').findRecord('user', this.get('credentials.id'))
      .then((selfUser) => {
        let requestObject = {
          user: selfUser,
          requestedUser: ''
        };
        this.get('store').findRecord('user', requestedUser)
        .then((requestedUser) => {
          requestObject.requestedUser = requestedUser;
          return requestObject;
        })
        .then(() => {
          if (requestObject.user.id !== requestObject.requestedUser.id) {
            let newFriendRequest = this.get('store').createRecord('friend-request', requestObject);
            newFriendRequest.save();
            this.refresh();
          } else {
            this.get('flashMessages').warning('You cannot friend yourself.');
          }
        });
      });
    },
    unRequestFriend(requestedUserId){
      this.get('store').findAll('friend-request')
      .then((requests) => {
        requests.forEach((request) => {
          request.get('requestedUser')
          .then((requestedUser) => {
            if (requestedUser.id === requestedUserId) {
              request.destroyRecord()
              .then(() => {
                this.refresh();
              });
            }
          });
        });
      });
    },
    viewProfile(){
      this.transitionTo('profile');
    },
  }
});

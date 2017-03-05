import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  classNameBindings: 'hiddenPerson:hidden',
  hiddenPerson: false,

  actions: {
    removeFriend (userId) {
      this.sendAction('removeFriend', userId);
    },
    cancelRequest (userId) {
      this.sendAction('cancelRequest', userId);
    },
    acceptRequest (userId) {
      this.sendAction('acceptRequest', userId);
    },
    declineRequest (userId) {
      this.sendAction('declineRequest', userId);
    },
    unRequestFriend (userId) {
      this.sendAction('unRequestFriend', userId);
    },
    editProfile () {
      this.sendAction('editProfile');
    },
    deleteProfile () {
      this.sendAction('deleteProfile');
    },
  }
});

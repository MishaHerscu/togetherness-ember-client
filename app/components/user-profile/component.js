import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  classNameBindings: 'hiddenPerson:hidden',
  hiddenPerson: false,

  actions: {
    hidePerson () {
      this.toggleProperty('hiddenPerson');
    },
    removeFriend () {
      this.sendAction('removeFriend', this.get('user.id'));
      this.toggleProperty('hiddenPerson');
    },
    cancelRequest () {
      this.sendAction('cancelRequest', this.get('user.id'));
      this.toggleProperty('hiddenPerson');
    },
    acceptRequest () {
      this.sendAction('acceptRequest', this.get('user.id'));
      this.toggleProperty('hiddenPerson');
    },
    declineRequest () {
      this.sendAction('declineRequest', this.get('user.id'));
      this.toggleProperty('hiddenPerson');
    },
    edit () {
      this.sendAction('editProfile');
    },
    delete () {
      this.sendAction('deleteProfile');
    },
  }
});

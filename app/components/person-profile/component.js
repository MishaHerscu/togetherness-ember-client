import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: 'hiddenPerson:hidden',
  hiddenPerson: false,

  actions: {
    closePerson () {
      this.toggleProperty('hiddenPerson');
    },
    hidePerson () {
      this.toggleProperty('hiddenPerson');
    },
    requestFriend () {
      this.sendAction('requestFriend', this.get('user.id'));
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
    viewProfile () {
      this.sendAction('viewProfile');
    },
  },
});

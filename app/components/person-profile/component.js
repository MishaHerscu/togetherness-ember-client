import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: 'hiddenPerson:hidden',
  hiddenPerson: false,

  actions: {
    closePerson () {
      this.toggleProperty('hiddenPerson');
    },
    requestFriend () {
      this.sendAction('requestFriend', this.get('user.id'));
      this.toggleProperty('hiddenPerson');
    },
    viewProfile () {
      this.sendAction('viewProfile');
    },
  },
});

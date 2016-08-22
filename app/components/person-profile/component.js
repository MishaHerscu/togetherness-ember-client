import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: 'hiddenPerson:hidden',
  hiddenPerson: false,

  actions: {
    closePerson () {
      this.toggleProperty('hiddenPerson');
    },
    requestFriend () {
      console.log('requesting friend');
    },
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],

  credentials: {},

  actions: {
    submit () {
      this.sendAction('submit', this.get('credentials'));
    },
    reset () {
      this.sendAction('reset');
    },
    signIn () {
      this.sendAction('signIn');
    },
  },
});

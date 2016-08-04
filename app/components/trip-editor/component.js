import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    submit () {
      this.sendAction('submit', this.get('tripData'));
    },

    cancel () {
      this.sendAction('cancel');
    },

  },
});

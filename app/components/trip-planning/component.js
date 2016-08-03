import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    submit () {
      this.sendAction('submit', this.get('attraction'));
    },
    cancel () {
      this.sendAction('cancel');
    },
  },
});

import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    submit () {
      this.sendAction('submit', this.get('trip'));
    },

    cancel () {
      this.sendAction('cancel');
    },

  },
});

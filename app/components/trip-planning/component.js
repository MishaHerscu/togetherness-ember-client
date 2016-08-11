import Ember from 'ember';

export default Ember.Component.extend({

  tripData: {
    name: null,
    notes: null,
    start_date: null,
    end_date: null,
  },

  actions: {
    submit () {
      this.sendAction('submit', this.get('tripData'));
    },

    cancel () {
      this.sendAction('cancel');
    },

  },
});

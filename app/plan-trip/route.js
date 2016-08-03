import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('attraction', params.attraction_id);
  },

  actions: {
    submit () {
      console.log('submitting');
    },
    cancel () {
      console.log('cancelling');
      this.transitionTo('attraction-suggestions');
    },
  },
});

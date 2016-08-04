import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('trip', params.trip_id);
  },

  actions: {
    save (trip) {
      trip.save();
      this.transitionTo('trips');
    },
    cancel () {
      this.transitionTo('trips');
    }
  }
});

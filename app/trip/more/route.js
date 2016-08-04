import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('trip', params.trip_id);
  },

  actions: {
    deleteTrip(trip){
      trip.destroyRecord();
      this.transitionTo('trips');
    },
    updateTrip(trip) {
      this.transitionTo('trips/edit', trip);
    },
    inviteFriend(trip) {
      console.log(trip);
    },
    back() {
      this.transitionTo('trips');
    },
  },
});

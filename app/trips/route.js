import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('trip');
  },

  actions: {
    deleteTrip(trip){
      trip.destroyRecord();
    },
    updateTrip(trip) {
      this.transitionTo('trips/edit', trip);
    },
    inviteFriend(trip) {
      console.log(trip);
    },
    openTrip(trip) {
      this.transitionTo('trip/more', trip);
    },
  },
});

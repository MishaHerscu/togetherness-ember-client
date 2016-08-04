import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('trip');
  },

  actions: {
    deleteTrip(trip){
      console.log(trip);
    },
    updateTrip(trip) {
      console.log(trip);
    },
    inviteFriend(trip) {
      console.log(trip);
    },

  },
});

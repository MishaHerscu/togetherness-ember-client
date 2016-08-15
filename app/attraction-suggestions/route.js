import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('attraction-suggestion')
    .then((result) => {
      return result.toArray().sort(() => {
        return 0.5 - Math.random();
      }).slice(0,20);
    })
    .then((result) => {
      let attractions = [];
      result.forEach((attraction) => {
        attractions.push(this.get('store').findRecord('attraction', attraction.id));
      });
      return attractions;
    });
  },

  actions: {
    createTrip(attraction){
      this.transitionTo('plan-trip', attraction);
    },
  },
});

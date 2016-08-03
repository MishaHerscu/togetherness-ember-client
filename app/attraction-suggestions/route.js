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
      let attractionIds = [];
      result.forEach((r) => {
        attractionIds.push(String(r.get('attraction_id')));
      });
      return this.get('store').findAll('attraction')
      .then((attractions) => {
        let kept_attractions = attractions.toArray().filter((attraction) => {
          return attractionIds.includes(String(attraction.get('id')));
        });
        return kept_attractions;
      });
    });
  },

  actions: {
    createTrip(attraction){
      this.transitionTo('plan-trip', attraction);
      // .then((planTrip) => {
      //   planTrip.controller.set('attraction', attraction);
      // });
    },
  },
});

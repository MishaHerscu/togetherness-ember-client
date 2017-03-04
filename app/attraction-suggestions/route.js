import Ember from 'ember';

export default Ember.Route.extend({

  model () {

    let errorReturn = (error) => {
      return Ember.RSVP.hash({
        attractions: [],
        recBool: false,
        error: error
      });
    };

    return this.get('store').findAll('attraction-suggestion')
    .then((result) => {
      let attractions = result.toArray();
      let recBool = attractions.length > 0 ? true : false;
      try {
        return attractions.sort(() => {
          return 0.5 - Math.random();
        }).slice(0,20)
        .then((result) => {
          try {
            let attractions = [];
            result.forEach((attraction) => {
              attractions.push(this.get('store').findRecord('attraction', attraction.id));
            });
            return Ember.RSVP.hash({
              attractions: attractions,
              recBool: recBool
            });
          } catch (error) {
            return errorReturn(error);
          }
        });
      } catch (error) {
        return errorReturn(error);
      }
    });
  },

  actions: {
    createTrip(attraction){
      this.transitionTo('plan-trip', attraction);
    },
  },
});

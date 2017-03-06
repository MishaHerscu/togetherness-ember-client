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

    return this.get('store').findAll('attraction-suggestion', { reload: true } )
    .then((result) => {
      let allAttractions = result.toArray();
      let recBool = allAttractions.length > 0 ? true : false;
      let maxAttractionIndex = Math.min(50,allAttractions.length);
      try {
        let sampleAttractions = allAttractions.sort(() => {
          return 0.5 - Math.random();
        }).slice(0,maxAttractionIndex);
        try {
          let attractions = [];
          sampleAttractions.forEach((suggestion) => {
            attractions.push(suggestion.get('attraction'));
          });
          return Ember.RSVP.hash({
            attractions: attractions,
            recBool: recBool
          });
        } catch (error) {
          return errorReturn(error);
        }
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

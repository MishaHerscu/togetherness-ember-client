import Ember from 'ember';

export default Ember.Route.extend({

  // using data from the back end
  // model () {
    // let sampleAttractions = this.get('store').findAll('attractions');
    // sampleAttractions = sampleAttractions.slice(0,20);
    // return sampleAttractions;
  // },

  // hard coded values for testing front end
  model: function(){
    return [
      {
        title: 'Awesome Party'
      },
      {
        title: 'Todo'
      }
    ];
  }

});

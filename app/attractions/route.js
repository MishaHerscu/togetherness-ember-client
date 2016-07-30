import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('attraction');
  },
});

  // eventsApi: Ember.inject.service(),
  // flashMessages: Ember.inject.service(),

  // using data from the back end
  // model () {
    // let sampleAttractions = this.get('store').findAll('attractions');
    // sampleAttractions = sampleAttractions.slice(0,20);
    // return sampleAttractions;
  // },

  // hard coded values for testing front end
  // model: function(){
  //   return [
  //     {
  //       title: 'Awesome Party'
  //     },
  //     {
  //       title: 'Todo'
  //     }
  //   ];
  // },

  // actions: {
  //   index () {
  //     this.get('eventsApi').index()
  //     .catch(() => {
  //       this.get('flashMessages')
  //       .danger('There was a problem. Please try again.');
  //     });
  //   },
  // },

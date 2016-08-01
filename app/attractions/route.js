import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),

  model () {
    return this.get('store').findAll('attraction')
    .then((result) => {
      return result.toArray().sort(() => {
        return 0.5 - Math.random();
      }).slice(0,40);
    });
  },

  actions: {
    likeAttraction(attraction){
      let user_attraction = {
        user_id: Number(this.get('credentials').get('id')),
        attraction_id: Number(attraction.id),
        like: true
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
    },
    dislikeAttraction(attraction) {
      let user_attraction = {
        user_id: Number(this.get('credentials').get('id')),
        attraction_id: Number(attraction.id),
        like: false
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
    },
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

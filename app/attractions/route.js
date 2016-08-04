import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),

  model () {
    return this.get('store').findAll('attraction')
    .then((result) => {
      return result.toArray().sort(() => {
        return 0.5 - Math.random();
      }).slice(0,50);
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

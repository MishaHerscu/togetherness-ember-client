import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),

  model () {
    return this.get('store').findAll('attraction');
  },

  actions: {
    likeAttraction(attraction){
      let user_attraction = {
        user_id: this.get('credentials.id'),
        attraction_id: Number(attraction.id),
        like: true
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
    },
    dislikeAttraction(attraction) {
      let user_attraction = {
        user_id: this.get('credentials.id'),
        attraction_id: Number(attraction.id),
        like: false
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
    },
  },
});

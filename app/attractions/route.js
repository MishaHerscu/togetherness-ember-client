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
    })
    .then((result) => {
      return result.filter((attraction) => {
        let cats = attraction.get('attraction_categories');
        let imgUrl = attraction.get('medium_image_url');
        let desc = attraction.get('description');
        return cats.content.length > 0 && imgUrl.length > 0 && desc.length > 0;
      });
    });
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

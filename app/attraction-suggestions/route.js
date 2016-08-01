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

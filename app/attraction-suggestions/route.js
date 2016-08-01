import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('attraction-suggestion')
    .then((result) => {
      return result.toArray().slice(0,40);
    });
  },
});

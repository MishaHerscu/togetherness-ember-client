import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('tag')
    .then((result) => {
      return result.toArray().slice(0,10);
    });
  },
});

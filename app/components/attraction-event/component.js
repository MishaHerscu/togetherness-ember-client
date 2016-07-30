import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  attractionEvents: {},

  actions: {
    viewAttractions () {
      this.sendAction('viewAttractions');
    },
  },
});

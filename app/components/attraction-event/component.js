import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  attractionEvents: {},

  actions: {
    likeAttraction (attraction) {
      this.sendAction('likeAttraction', attraction);
    },
    dislikeAttraction (attraction) {
      this.sendAction('dislikeAttraction', attraction);
    },
  },
});

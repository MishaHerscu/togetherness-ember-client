import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  attractionEvents: {},

  actions: {
    likeAttraction () {
      this.sendAction('likeAttraction');
    },
    dislikeAttraction () {
      this.sendAction('dislikeAttraction');
    },
  },
});

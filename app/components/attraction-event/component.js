import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: 'hiddenAttraction:hidden',
  hiddenAttraction: false,

  attractionEvents: {},

  actions: {
    likeAttraction () {
      this.sendAction('likeAttraction', this.get('attraction'));
    },
    dislikeAttraction () {
      this.sendAction('dislikeAttraction', this.get('attraction'));
    },
    closeAttraction () {
      this.toggleProperty('hiddenAttraction');
    },
  },
});

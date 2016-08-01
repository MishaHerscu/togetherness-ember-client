import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: 'hiddenAttraction:hidden',
  hiddenAttraction: false,

  attractionEvents: {},

  actions: {
    closeAttraction () {
      this.toggleProperty('hiddenAttraction');
    },
    likeAttraction () {
      this.sendAction('likeAttraction', this.get('attraction'));
      this.toggleProperty('hiddenAttraction');
    },
    dislikeAttraction () {
      this.sendAction('dislikeAttraction', this.get('attraction'));
      this.toggleProperty('hiddenAttraction');
    },
  },
});

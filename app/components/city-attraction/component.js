import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: 'hiddenAttraction:hidden',
  hiddenAttraction: false,

  attractionEvents: {},

  actions: {
  },
});

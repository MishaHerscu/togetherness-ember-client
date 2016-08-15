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
    createTrip () {
      this.sendAction('createTrip', this.get('attraction.id'));
    }
  },
});

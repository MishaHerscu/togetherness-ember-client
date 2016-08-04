import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: 'hiddenAttraction:hidden',
  hiddenAttraction: false,

  actions: {
    deleteTrip () {
      this.sendAction('deleteTrip', this.get('trip'));
      this.toggleProperty('hiddenAttraction');
    },
    updateTrip () {
      this.sendAction('updateTrip', this.get('trip'));
    },
    inviteFriend () {
      this.sendAction('inviteFriend', this.get('trip'));
    },
    back () {
      this.sendAction('back');
    }
  },
});

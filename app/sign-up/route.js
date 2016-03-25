import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').createRecord('sign-up');
  },

  actions: {
    signUp (credentials) {
      let user = this.get('store').createRecord('sign-up', credentials);
      user.save();
    },
  },
});

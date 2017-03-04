import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  model () {
    return this.get('credentials');
  },

  actions: {
    submitProfileEdits (credentials) {
      this.get('auth').submitProfileEdits(credentials);
      this.transitionTo('profile');
    },

    cancelProfileEdits () {
      this.transitionTo('profile');
    }
  }
});

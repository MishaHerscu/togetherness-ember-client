import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    trulyDeleteProfile () {
      this.get('auth').deleteProfile();
      this.transitionTo('profile');
      this.transitionTo('/');
    },

    signOut () {
      this.get('auth').signOut()
      .then(() => this.transitionTo('sign-in'))
      .then(() => {
        this.get('flashMessages').warning('You have been signed out.');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Are you sure you\'re signed-in?');
      });
      this.store.unloadAll();
    },

    back () {
      this.transitionTo('profile');
    }
  },
});

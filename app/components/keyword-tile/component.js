import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    removeKeyword () {
      this.sendAction('removeKeyword', this.get('keyword'));
    },
  },
});

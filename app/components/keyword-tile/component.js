import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    removeKeyword () {
      this.sendAction('removeKeyword', this.get('keyword.word'));
    },
    selectKeyword () {
      this.sendAction('selectKeyword', this.get('keyword'));
    },
    unSelectKeyword () {
      this.sendAction('unSelectKeyword', this.get('keyword'));
    },
  },
});

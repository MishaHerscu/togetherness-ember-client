import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  newKeyWord: '',

  actions: {
    viewProfile () {
      this.sendAction('viewProfile');
    },
    addKeyword () {
      this.sendAction('addKeyword', this.get('newKeyWord'));
    },
    removeKeyword (keyword) {
      this.sendAction('removeKeyword', keyword);
    },
    updateKeywordSearch (keywordSearch) {
      this.sendAction('updateKeywordSearch', keywordSearch);
    },
  },
});

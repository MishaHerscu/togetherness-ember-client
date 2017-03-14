import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  newKeyWord: '',
  newCategory: 1,
  selectedKeywords: '',

  actions: {
    viewProfile () {
      this.sendAction('viewProfile');
    },
    addKeyword () {
      this.sendAction('addKeyword', this.get('newKeyWord'), this.get('newCategory'));
    },
    removeKeyword (keyword) {
      this.sendAction('removeKeyword', keyword);
    },
    updateKeywordSearch (keywordSearch) {
      this.sendAction('updateKeywordSearch', keywordSearch);
    },
    removeSelectedKeywords () {
      this.sendAction('removeSelectedKeywords');
    },
    removeAllKeywords () {
      this.sendAction('removeAllKeywords');
    },
    selectKeyword (keyword) {
      this.sendAction('selectKeyword', keyword);
    },
    unSelectKeyword (keyword) {
      this.sendAction('unSelectKeyword', keyword);
    },
  },
});

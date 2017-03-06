import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    updateKeywordSearch () {
      this.sendAction('updateKeywordSearch', this.get('keywordSearch'));
    },
  },
});

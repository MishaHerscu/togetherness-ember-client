import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  auth: Ember.inject.service(),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

  actions: {
    submit () {
      this.sendAction('submitProfileEdits', this.get('credentials'));
    },

    cancel () {
      this.sendAction('cancelProfileEdits');
    },
  }
});

import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    submit () {
      console.log('submitting');
    },
    cancel () {
      console.log('cancelling');
    },
  },
});

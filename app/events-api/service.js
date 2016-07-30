import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  exampleAttractions: storageFor('events-api'),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

  index () {
    return this.get('ajax').get('/attractions')
    .then((result) => {
      this.get('exampleAttractions').set('example-attractions', result);
    });
  },

  show (attraction_id) {
    return this.get('ajax').get('/attractions/' + attraction_id)
    .then((result) => {
      this.get('exampleAttractions').set('specific-attraction', result);
    });
  },
});

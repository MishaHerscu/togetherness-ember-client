import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  credentials: storageFor('auth'),

  model (params) {
    return this.get('store').findRecord('attraction', params.attraction_id);
  },

  actions: {
    submit (data) {
      let tripData = {
        name: data.name,
        notes: data.notes,
        city: '',
        user: '',
        start_date: data.start_date,
        end_date: data.end_date,
      };

      let attractionId = this.get('router.router.state.params.plan-trip.attraction_id');
      this.get('store').findRecord('attraction', attractionId)
      .then((attraction) => {
        tripData.city = attraction.get('city');
      })
      .then(() => {
        let newTrip = this.get('store').createRecord('trip', tripData);
        newTrip.save();
      })
      .then(() => {
        this.transitionTo('trips');
      });
    },
    cancel () {
      this.transitionTo('attraction-suggestions');
    },
  },
});

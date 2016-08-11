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
        return attraction.get('city_id');
      })
      .then((city_id) => {
        tripData.city = this.get('store').findRecord('city', city_id);
      })
      .then(() => {
        tripData.user = this.get('store').findRecord('user', this.get('credentials.id'));
      })
      .then(() => {
        console.log(tripData);
        let newTrip = this.get('store').createRecord('trip', tripData);
        console.log(newTrip);
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

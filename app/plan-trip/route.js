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
        city_id: '',
        user_id: '',
        start_date: data.start_date,
        end_date: data.end_date,
      };

      let attractionId = this.get('router.router.state.params.plan-trip.attraction_id');
      this.get('store').findRecord('attraction', attractionId)
      .then((attraction) => {
        return attraction.get('city_id');
      })
      .then((city_id) => {
        tripData.city_id = city_id;
      })
      .then(() => {
        tripData.user_id = this.get('credentials.id');
      })
      .then(() => {
        let newTrip = this.get('store').createRecord('trip', tripData);
        newTrip.save();
        return newTrip;
      })
      .then((trip) => {
        let attendanceParams = {
          trip_id: trip.id,
          user_id: tripData.user_id
        };
        let newAttendance = this.get('store').createRecord('attendance', attendanceParams);
        newAttendance.save();
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

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('attractions');
  this.route('attraction-suggestions');
  this.route('cities');
  this.route('trips');
  this.route('trips/edit', { path: '/trips/:trip_id/edit' });
  this.route('attendances');
  this.route('plan-trip', { path:'/plan-trip/:attraction_id' } );
});

export default Router;

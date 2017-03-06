import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('profile');
  this.route('profile/delete', { path: '/profile/delete' });
  this.route('profile/edit', { path: '/profile/edit' });
  this.route('attractions');
  this.route('attraction-suggestions');
  this.route('cities');
  this.route('trip/more', { path: '/trip/:trip_id/details' });
  this.route('trips');
  this.route('trips/edit', { path: '/trips/:trip_id/edit' });
  this.route('attendances');
  this.route('plan-trip', { path:'/plan-trip/:attraction_id' } );
  this.route('people');
  this.route('change-password');
  this.route('about');
  this.route('team');
  this.route('contact');
  this.route('all-events');
});

export default Router;

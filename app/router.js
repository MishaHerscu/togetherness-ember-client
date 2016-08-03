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
  this.route('attendances');
});

export default Router;

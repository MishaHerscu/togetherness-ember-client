import DS from 'ember-data';

export default DS.Model.extend({
  city_name: DS.attr('string'),
  country_name: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.attr('string'),
  start_time: DS.attr('string'),
  stop_time: DS.attr('string'),
  all_day: DS.attr('string'),
  venue_name: DS.attr('string'),
  venue_address: DS.attr('string'),
  venue_url: DS.attr('string'),
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
});

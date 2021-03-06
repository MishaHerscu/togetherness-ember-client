import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  categories_string: DS.attr('string'),
  eventful_id: DS.attr('string'),
  city_name: DS.attr('string'),
  country_name: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  keywords_string: DS.attr('string'),
  owner: DS.attr('string'),
  db_start_time: DS.attr('string'),
  db_stop_time: DS.attr('string'),
  event_date: DS.attr('string'),
  event_time: DS.attr('string'),
  event_time_zone: DS.attr('string'),
  all_day: DS.attr('string'),
  venue_id: DS.attr('string'),
  venue_name: DS.attr('string'),
  venue_address: DS.attr('string'),
  postal_code: DS.attr('string'),
  venue_url: DS.attr('string'),
  geocode_type: DS.attr('string'),
  latitude: DS.attr('string'),
  longitude: DS.attr('string'),
  image_information: DS.attr('string'),
  medium_image_url: DS.attr('string'),

  city: belongsTo('city'),

  attraction_suggestions: hasMany('attraction_suggestion', {
    inverse: 'attraction'
  }),
  attraction_categories: hasMany('attraction_category', {
    inverse: 'attraction'
  }),
});

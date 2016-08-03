import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  city_id: DS.attr('string'),
  user_id: DS.attr('string'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string'),
  attendances: DS.hasMany('attendance')
});

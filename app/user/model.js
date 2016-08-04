import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  trips: DS.hasMany('trip'),
  attendances: DS.hasMany('attendance'),
});

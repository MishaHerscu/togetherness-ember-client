import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  notes: DS.attr('string'),
  city: DS.belongsTo('city'),
  user: DS.belongsTo('user'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string'),
  attendances: DS.hasMany('attendance')
});

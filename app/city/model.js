import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  attractions: DS.hasMany('attraction'),
  trips: DS.hasMany('trip'),
});

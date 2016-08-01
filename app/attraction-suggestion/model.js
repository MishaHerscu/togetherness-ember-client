import DS from 'ember-data';

export default DS.Model.extend({
  user_id: DS.attr('string'),
  attraction_id: DS.attr('string'),
});

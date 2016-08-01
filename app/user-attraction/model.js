import DS from 'ember-data';

export default DS.Model.extend({
  attraction_id: DS.attr('number'),
  user_id: DS.attr('number'),
  like: DS.attr('boolean')
});

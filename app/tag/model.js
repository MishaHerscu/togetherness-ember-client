import DS from 'ember-data';

export default DS.Model.extend({
  tag: DS.attr('string'),
  usages: DS.attr('string'),
  relative_usage: DS.attr('string')
});

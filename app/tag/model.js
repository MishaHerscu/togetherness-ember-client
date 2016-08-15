import DS from 'ember-data';
// import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  tag: DS.attr('string'),
  usages: DS.attr('string'),
  relative_usage: DS.attr('string'),

  attraction_tags: hasMany('attraction-tag'),
  user_tags: hasMany('user-tag')
});

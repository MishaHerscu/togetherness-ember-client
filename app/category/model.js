import DS from 'ember-data';
// import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  title: DS.attr('string'),
  label: DS.attr('string'),

  attraction_categories: hasMany('attraction_category', {
    inverse: 'attraction'
  }),
});

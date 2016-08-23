import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('string'),
  notes: DS.attr('string'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string'),

  city: belongsTo('city'),
  user: belongsTo('user'),

  attendances: hasMany('attendance')
});

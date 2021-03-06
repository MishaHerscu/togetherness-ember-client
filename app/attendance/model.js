import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
// import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  trip: belongsTo('trip'),
  user: belongsTo('user'),
});

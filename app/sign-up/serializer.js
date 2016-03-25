import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForAttribute (attr) {
    return Ember.String.underscore(attr);
  },

  serialize (snapshot, options) {
    let json = {};
    json.credentials = this._super(snapshot, options);
    return json;
  }
});

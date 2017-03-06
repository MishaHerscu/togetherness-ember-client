import Ember from 'ember';
import DS from 'ember-data';
// import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  email: DS.attr('string'),
  givenname: DS.attr('string'),
  surname: DS.attr('string'),
  keywords_string: DS.attr('string'),

  attendances: hasMany('attendance'),
  trips: hasMany('trip'),
  user_tags: hasMany('user_tag'),
  friend_requests: hasMany('friend_request', {
    inverse: 'user'
  }),
  friendships: hasMany('friendship', {
    inverse: 'user'
  }),
  attraction_suggestions: hasMany('attraction_suggestion', {
    inverse: 'user'
  }),
  fullName: Ember.computed('givenname', 'surname', function() {
    return `${this.get('givenname')} ${this.get('surname')}`;
  }),
});

import { moduleForModel, test } from 'ember-qunit';

moduleForModel('attraction-tag', 'Unit | Model | attraction tag', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

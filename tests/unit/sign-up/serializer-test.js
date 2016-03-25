import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sign-up', 'Unit | Serializer | sign up', {
  // Specify the other units that are required for this test.
  needs: ['serializer:sign-up']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

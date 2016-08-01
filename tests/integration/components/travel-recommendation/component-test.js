import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('travel-recommendation', 'Integration | Component | travel recommendation', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{travel-recommendation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#travel-recommendation}}
      template block text
    {{/travel-recommendation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

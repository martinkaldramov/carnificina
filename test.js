const test = require('tape'); // eslint-disable-line

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape.', (assert) => {
  const expected = 1;
  const actual = 1;

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  assert.end();
});

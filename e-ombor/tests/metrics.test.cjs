const test = require('node:test');
const assert = require('node:assert/strict');
const { buildV23Metrics, paginate, canMutateV21 } = require('../ui-v23.js');

test('all materials contribute to the material count and distribution', () => {
  const data = { permits: [{ items: Array.from({length: 7}, (_, i) => ({material: `Material ${i}`, qty: 10, weight: i + 1})) }], shipments: [] };
  const before = JSON.stringify(data);
  const result = buildV23Metrics(data);
  assert.equal(result.materials.length, 7);
  assert.equal(result.materials.reduce((sum, m) => sum + m.weight, 0), result.allowedWeight);
  assert.equal(JSON.stringify(data), before);
});

test('balances include recorded shipments without modifying source data', () => {
  const data = {permits:[{items:[{material:'Cotton',qty:20,weight:100}]}],shipments:[{lines:[{qty:4,weight:25}]}]};
  const before = JSON.stringify(data);
  const result = buildV23Metrics(data);
  assert.equal(result.remainingWeight,75);
  assert.equal(result.remainingQty,16);
  assert.equal(JSON.stringify(data),before);
});

test('pagination clamps an out-of-range page and retains every record', () => {
  const rows = Array.from({length:43}, (_,i)=>i);
  assert.deepEqual(paginate(rows,99,20).items,[40,41,42]);
  assert.equal(paginate([],1,20).pageCount,1);
});

test('unauthenticated visitors cannot mutate records', () => {
  assert.equal(canMutateV21(null),false);
  assert.equal(canMutateV21({loggedIn:false}),false);
});

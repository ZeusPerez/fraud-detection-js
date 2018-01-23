const normalizer = require('../Classes/OrderNormalizer')
const assert = require('assert')

describe('Order Normalizer', function () {
  let orders = [{
    orderId: 1,
    dealId: 1,
    email: 'bu.gs+nosurname@bunny.com',
    street: '123 sesame st.',
    city: 'new york',
    state: 'ny',
    zipCode: 10011,
    creditCard: 12345689010
  },
  {
    orderId: 1,
    dealId: 1,
    email: 'roger@rabbit.com',
    street: '123 sesame st.',
    city: 'new york',
    state: 'ny',
    zipCode: 10011,
    creditCard: 12345689010
  }]

  it('Normalizes the email with cross and dot', function () {
    let result = new normalizer.OrderNormalizer(orders).normalize()
    assert.ok(result)
    assert.equal(result[0].email, 'bugs@bunny.com')
  })

  it('Normalizes the email without cross and dot', function () {
    let result = new normalizer.OrderNormalizer(orders).normalize()
    assert.ok(result)
    assert.equal(result[1].email, 'roger@rabbit.com')
  })

  it('Normalizes the street', function () {
    let result = new normalizer.OrderNormalizer(orders).normalize()
    assert.ok(result)
    assert.equal(result[1].street, '123 sesame street')
  })

  it('Normalizes the state', function () {
    let result = new normalizer.OrderNormalizer(orders).normalize()
    assert.ok(result)
    assert.equal(result[1].state, 'new york')
  })
})

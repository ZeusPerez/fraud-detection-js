const checker = require('../Classes/OrderChecker')
const assert = require('assert')

describe('Order Cheker', function () {
  let orders = [{
    orderId: 1,
    dealId: 1,
    email: 'bugs@bunny.com',
    street: '123 sesame st.',
    city: 'new york',
    state: 'ny',
    zipCode: 10011,
    creditCard: 12345689010
  },
  {
    orderId: 2,
    dealId: 1,
    email: 'bugs@bunny.com',
    street: '123 sesame st.',
    city: 'new york',
    state: 'il',
    zipCode: 10011,
    creditCard: 12345689011
  },
  {
    orderId: 3,
    dealId: 1,
    email: 'roger@rabbit.com',
    street: '123 sesame st.',
    city: 'new york',
    state: 'ny',
    zipCode: 10011,
    creditCard: 12345689011
  }]

  it('Detects the email frauds', function () {
    let result = new checker.EmailChecker(orders).detect()
    assert.ok(result)
    assert.equal(result[0].orderId, 2)
  })

  it('Detects the street fraud', function () {
    let result = new checker.AddressChecker(orders).detect()
    assert.ok(result)
    assert.equal(result[0].orderId, 3)
  })
})
